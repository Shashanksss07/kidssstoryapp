insert into storage.buckets (id,name,public) values ('story-images','story-images',false) on conflict (id) do nothing;
insert into storage.buckets (id,name,public) values ('story-audio','story-audio',false) on conflict (id) do nothing;
create policy "own story images read" on storage.objects for select using (bucket_id='story-images' and auth.uid()::text=(storage.foldername(name))[1]);
create policy "own story audio read" on storage.objects for select using (bucket_id='story-audio' and auth.uid()::text=(storage.foldername(name))[1]);
create policy "own story images upload" on storage.objects for insert with check (bucket_id='story-images' and auth.uid()::text=(storage.foldername(name))[1]);
create policy "own story audio upload" on storage.objects for insert with check (bucket_id='story-audio' and auth.uid()::text=(storage.foldername(name))[1]);
