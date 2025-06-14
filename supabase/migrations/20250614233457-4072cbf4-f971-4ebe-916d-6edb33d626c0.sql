
-- Remove todas as policies antigas na tabela profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can edit their own profile" ON public.profiles;

-- Remove outras policies personalizadas de profiles se houver (adicione mais linhas conforme necessário)

-- Deixa apenas a policy pública de SELECT
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);
