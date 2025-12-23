-- Add profile_type column to store the specific professional type
ALTER TABLE public.profiles 
ADD COLUMN profile_type text;

-- Add comment explaining the values
COMMENT ON COLUMN public.profiles.profile_type IS 'Professional type: piercer_individual, piercing_shop, piercing_tattoo_studio, supplier, event_promoter';