-- YÖNETİCİ + YAZAR BAŞVURULARI / CV GÜVENLİK KURULUMU
-- Supabase Dashboard > SQL Editor'de bir kez çalıştırın.
--
-- Bu satır, yönetici hesabını tanımlar. Önce bu dosyanın tamamını çalıştırın;
-- ardından yönetim panelinden çıkış yapıp yeniden giriş yapın.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"site_role":"admin"}'::jsonb
where email = 'cagatayybrucu@gmail.com';
--
-- Ardından bu dosyanın tamamını çalıştırın ve yönetim panelinden çıkış-giriş yapın.
-- Bu işlem mevcut başvuruları veya CV'leri silmez.

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'site_role') = 'admin', false);
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

-- Başvuru göndermek herkese açık kalır; okuma ve karar verme yalnızca yöneticiye açılır.
drop policy if exists "Authenticated admins review writer applications" on public.author_applications;
drop policy if exists "Authenticated admins update writer applications" on public.author_applications;
drop policy if exists "Site admins review writer applications" on public.author_applications;
drop policy if exists "Site admins update writer applications" on public.author_applications;

create policy "Site admins review writer applications"
on public.author_applications
for select
to authenticated
using (public.is_site_admin());

create policy "Site admins update writer applications"
on public.author_applications
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

-- Bucket gizli kalır. Başvuru sahibi yalnızca applications/ klasörüne yükler;
-- dosyayı açma ve süreli bağlantı üretme yalnızca yönetici hesabına aittir.
drop policy if exists "Anyone can upload writer CV" on storage.objects;
drop policy if exists "Authenticated admins can view writer CV" on storage.objects;
drop policy if exists "Site admins can view writer CV" on storage.objects;

create policy "Anyone can upload writer CV"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'writer-cvs'
  and name like 'applications/%'
);

create policy "Site admins can view writer CV"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'writer-cvs'
  and public.is_site_admin()
);
