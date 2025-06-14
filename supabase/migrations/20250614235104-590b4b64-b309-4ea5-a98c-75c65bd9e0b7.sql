
-- Migração automática: cria piercers para todos os perfis que não estão na tabela piercers

INSERT INTO public.piercers (
  user_id,
  name,
  city,
  state,
  country,
  bio,
  portfolio_images,
  featured,
  verified,
  created_at,
  updated_at,
  rating,
  total_reviews
)
SELECT
  p.id AS user_id,
  COALESCE(p.full_name, 'Piercer') AS name,
  COALESCE(p.city, '') AS city,
  '' AS state,
  'Brasil' AS country,
  NULL AS bio,
  NULL AS portfolio_images,
  false AS featured,
  false AS verified,
  NOW() AS created_at,
  NOW() AS updated_at,
  0 AS rating,
  0 AS total_reviews
FROM public.profiles p
LEFT JOIN public.piercers pi ON pi.user_id = p.id
WHERE pi.user_id IS NULL;
