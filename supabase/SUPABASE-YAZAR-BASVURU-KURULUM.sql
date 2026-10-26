-- YAZAR BAŞVURU FORMU + YÖNETİM İNCELEME KUTUSU
-- Supabase Dashboard > SQL Editor'de bir kez çalıştırın.
-- Mevcut blog, yazar veya randevu verilerini değiştirmez.

create table if not exists public.author_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) >= 3),
  email text not null check (position('@' in email) > 1),
  phone text,
  education text not null,
  expertise text not null,
  experience_years text,
  portfolio_url text,
  sample_topic text not null,
  motivation text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Dosya ve niyet yazısı alanları: eski kurulumu olan projelerde güvenle eklenir.
alter table public.author_applications add column if not exists cv_path text;
alter table public.author_applications add column if not exists intent_letter text;

create index if not exists author_applications_status_created_at_idx
  on public.author_applications (status, created_at desc);

alter table public.author_applications enable row level security;

-- RLS politikası tek başına yeterli değildir: PostgREST rollerinin tabloya
-- erişim izni de olmalıdır. Bu satırlar mevcut kurulumlarda görülen
-- "permission denied for table author_applications" hatasını giderir.
grant usage on schema public to anon, authenticated;
grant insert on table public.author_applications to anon, authenticated;
grant select, update on table public.author_applications to authenticated;

-- Ziyaretçi yalnızca kendi başvurusunu ekleyebilir; kayıtları okuyamaz.
drop policy if exists "Anyone can submit writer application" on public.author_applications;
create policy "Anyone can submit writer application"
on public.author_applications
for insert
to anon, authenticated
with check (status = 'pending');

-- Mevcut yönetim paneli Supabase Auth ile çalışır. Paneldeki oturum açmış yönetici,
-- başvuruları inceleyebilir ve durumunu güncelleyebilir.
-- Not: Yazar girişleri için ayrı Supabase Auth hesapları kullanıyorsanız, üretimde
-- bu iki policy'yi yalnızca yönetici rolünüze göre daraltmanız önerilir.
drop policy if exists "Authenticated admins review writer applications" on public.author_applications;
create policy "Authenticated admins review writer applications"
on public.author_applications
for select
to authenticated
using (true);

drop policy if exists "Authenticated admins update writer applications" on public.author_applications;
create policy "Authenticated admins update writer applications"
on public.author_applications
for update
to authenticated
using (true)
with check (true);

create or replace function public.set_author_application_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists author_applications_updated_at on public.author_applications;
create trigger author_applications_updated_at
before update on public.author_applications
for each row execute function public.set_author_application_updated_at();

-- CV'ler herkese açık değildir. Ziyaretçi yalnızca yükleme yapar; görüntüleme
-- bağlantısı admin panelinde süreli (signed) URL olarak üretilir.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'writer-cvs',
  'writer-cvs',
  false,
  8388608,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update set
  public = false,
  file_size_limit = 8388608,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can upload writer CV" on storage.objects;
create policy "Anyone can upload writer CV"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'writer-cvs');

drop policy if exists "Authenticated admins can view writer CV" on storage.objects;
create policy "Authenticated admins can view writer CV"
on storage.objects
for select
to authenticated
using (bucket_id = 'writer-cvs');
