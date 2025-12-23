
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

type UserProfile = {
  id: string;
  full_name: string | null;
  city: string | null;
  avatar_url: string | null;
  is_event_organizer: boolean;
  is_supplier: boolean;
  is_piercer: boolean;
  profile_type: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any | null }>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Function to update profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...data } : null);
      }

      return { error };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  // Function to reload user profile data
  const refreshProfile = async () => {
    if (!user) return;

    const fetchedProfile = await fetchProfile(user.id);
    if (fetchedProfile) {
      setProfile(fetchedProfile);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock
          setTimeout(async () => {
            const fetchedProfile = await fetchProfile(session.user.id);
            setProfile(fetchedProfile);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const fetchedProfile = await fetchProfile(session.user.id);
        setProfile(fetchedProfile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        toast.success("Login realizado com sucesso!");
        navigate('/');
      }
      return { error };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData?.fullName,
            city: userData?.city,
            profile_type: userData?.profileType
          }
        }
      });
      
      if (!error) {
        toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmação.");
        
        // Atualizar perfil com tipo e flags após criação
        setTimeout(async () => {
          const { data: userRecord } = await supabase.auth.getUser();
          const userId = userRecord?.user?.id;
          if (userId && userData?.profileType) {
            // Determinar flags baseado no tipo de perfil
            const isPiercer = ['piercer_individual', 'piercing_shop', 'piercing_tattoo_studio'].includes(userData.profileType);
            const isSupplier = userData.profileType === 'supplier';
            const isEventOrganizer = userData.profileType === 'event_promoter';

            // Atualizar perfil com tipo e flags
            await supabase
              .from('profiles')
              .update({
                profile_type: userData.profileType,
                is_piercer: isPiercer,
                is_supplier: isSupplier,
                is_event_organizer: isEventOrganizer
              })
              .eq('id', userId);

            // Inserir piercer somente se for um tipo de piercer
            if (isPiercer) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, city')
                .eq('id', userId)
                .single();

              const { data: existingPiercer } = await supabase
                .from('piercers')
                .select('id')
                .eq('user_id', userId)
                .maybeSingle();

              if (!existingPiercer && profile) {
                await supabase.from('piercers').insert({
                  user_id: userId,
                  name: profile.full_name ?? "Nome",
                  city: profile.city ?? "",
                  state: "",
                  country: "Brasil",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                });
              }
            }
          }
        }, 1200);
      }
      
      return { error };
    } catch (error) {
      console.error('Error during sign up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    setProfile(null);
    toast.success("Logout realizado com sucesso!");
    navigate('/');
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
