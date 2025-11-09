-- Add event_name column to reviews table
ALTER TABLE public.reviews 
ADD COLUMN event_name text;