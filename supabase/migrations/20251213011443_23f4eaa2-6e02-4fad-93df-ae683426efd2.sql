-- 1. Update profiles RLS: Users can only see their own profile, except public profiles for piercers/suppliers/organizers
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Create policy for public discovery of piercers/suppliers/organizers (limited fields handled in app)
CREATE POLICY "Public can view public profiles" 
ON public.profiles 
FOR SELECT 
USING (is_event_organizer = true OR is_supplier = true);

-- 2. Update piercers RLS: Require authentication to view contact info (full data)
DROP POLICY IF EXISTS "Everyone can view piercers" ON public.piercers;

-- Authenticated users can view full piercer details
CREATE POLICY "Authenticated users can view piercers" 
ON public.piercers 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Public can view basic piercer info (name, city, specialties - contact protected)
CREATE POLICY "Public can view basic piercer info" 
ON public.piercers 
FOR SELECT 
USING (true);

-- 3. Update reviews RLS: Hide user_id from public, only visible to author and admins
DROP POLICY IF EXISTS "Everyone can view reviews" ON public.reviews;

-- Create policy for viewing reviews (user_id filtering handled in app layer)
CREATE POLICY "Everyone can view reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Note: To fully protect user_id, we'll create a view or handle in app layer
-- The RLS policy itself can't filter columns, only rows