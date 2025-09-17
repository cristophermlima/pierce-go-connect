-- Fix the handle_new_user function to have proper permissions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql 
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, city, state, country, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'state',
    'Brasil',
    now(), 
    now()
  );
  RETURN NEW;
END;
$$;

-- Add missing columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_event_organizer BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_supplier BOOLEAN DEFAULT false;