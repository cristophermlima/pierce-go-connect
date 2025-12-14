-- Add is_piercer column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_piercer boolean DEFAULT false;

-- Update existing users to be piercers (for the catalog)
UPDATE public.profiles 
SET is_piercer = true 
WHERE full_name IS NOT NULL AND full_name != '';

-- Drop old public view policy and create new one that includes piercers
DROP POLICY IF EXISTS "Public can view public profiles" ON public.profiles;

CREATE POLICY "Public can view public profiles" 
ON public.profiles 
FOR SELECT 
USING (is_event_organizer = true OR is_supplier = true OR is_piercer = true);