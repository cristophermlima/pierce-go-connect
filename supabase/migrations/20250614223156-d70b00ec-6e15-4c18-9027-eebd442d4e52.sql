
-- 1. Profiles table policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can edit their own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 2. Piercers
CREATE POLICY "Users can view their own piercer row" ON public.piercers
  FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert piercer row" ON public.piercers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their piercer row" ON public.piercers
  FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their piercer row" ON public.piercers
  FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 3. Events
CREATE POLICY "Users can view their events" ON public.events
  FOR SELECT
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert event" ON public.events
  FOR INSERT
  WITH CHECK (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their events" ON public.events
  FOR UPDATE
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their events" ON public.events
  FOR DELETE
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 4. Suppliers
CREATE POLICY "Users can view their suppliers" ON public.suppliers
  FOR SELECT
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert supplier" ON public.suppliers
  FOR INSERT
  WITH CHECK (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their suppliers" ON public.suppliers
  FOR UPDATE
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their suppliers" ON public.suppliers
  FOR DELETE
  USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 5. Reviews
CREATE POLICY "Users can view their own reviews" ON public.reviews
  FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert reviews" ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their reviews" ON public.reviews
  FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their reviews" ON public.reviews
  FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 6. Schedules
CREATE POLICY "Users can view their schedules" ON public.schedules
  FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert schedule" ON public.schedules
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their schedules" ON public.schedules
  FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their schedules" ON public.schedules
  FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 7. Travel Plans
CREATE POLICY "Users can view their travel plans" ON public.travel_plans
  FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert travel plan" ON public.travel_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their travel plans" ON public.travel_plans
  FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their travel plans" ON public.travel_plans
  FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 8. Piercer Reviews
CREATE POLICY "Users can view their piercer reviews" ON public.piercer_reviews
  FOR SELECT
  USING (auth.uid() = reviewer_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert piercer review" ON public.piercer_reviews
  FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their piercer reviews" ON public.piercer_reviews
  FOR UPDATE
  USING (auth.uid() = reviewer_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their piercer reviews" ON public.piercer_reviews
  FOR DELETE
  USING (auth.uid() = reviewer_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 9. Subscribers
CREATE POLICY "Users can view their subscriber row" ON public.subscribers
  FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can insert subscriber row" ON public.subscribers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can update their subscriber row" ON public.subscribers
  FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Users can delete their subscriber row" ON public.subscribers
  FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- 10. Learning Resources
CREATE POLICY "Anyone can view learning resources" ON public.learning_resources
  FOR SELECT
  USING (true);
CREATE POLICY "Admin can manage learning resources" ON public.learning_resources
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Admin can update learning resources" ON public.learning_resources
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
CREATE POLICY "Admin can delete learning resources" ON public.learning_resources
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));
