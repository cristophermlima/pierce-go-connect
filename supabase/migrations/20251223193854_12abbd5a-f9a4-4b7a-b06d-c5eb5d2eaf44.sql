-- Add certificate fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN certificate_url text,
ADD COLUMN certificate_status text DEFAULT 'pending';

-- Add comment explaining the values
COMMENT ON COLUMN public.profiles.certificate_status IS 'Certificate status: pending, approved, rejected';

-- Create index for admin queries
CREATE INDEX idx_profiles_certificate_status ON public.profiles(certificate_status);

-- Update storage policy to allow certificate uploads
CREATE POLICY "Users can upload their own certificates"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own certificates"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all certificates"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'images'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  )
);

-- Add admin policy to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Add admin policy to update all profiles (for approval)
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);