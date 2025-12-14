-- Update profiles without full_name to use email username
UPDATE public.profiles 
SET full_name = 'mattheuslima0251'
WHERE id = 'cf261450-1cc9-472a-b7fe-ba93706cd56d' AND (full_name IS NULL OR full_name = '');

UPDATE public.profiles 
SET full_name = 'vikaaspiercing'
WHERE id = '74dd110d-6179-4870-bc99-ec5a406eb5c7' AND (full_name IS NULL OR full_name = '');