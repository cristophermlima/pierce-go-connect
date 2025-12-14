-- Update ALL profiles to be piercers (not just those with full_name)
UPDATE public.profiles 
SET is_piercer = true;