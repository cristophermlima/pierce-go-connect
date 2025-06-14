
-- 1. Permitir SELECT público na tabela reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);

-- 2. Permitir SELECT público na tabela piercers
ALTER TABLE public.piercers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view piercers" ON public.piercers FOR SELECT USING (true);

-- 3. Permitir SELECT público na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);
