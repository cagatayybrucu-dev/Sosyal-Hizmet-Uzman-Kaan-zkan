-- RANDEVU MÜSAİTLİK + ÇİFTE REZERVASYON KORUMASI
-- Supabase Dashboard > SQL Editor'de bir kez çalıştırın.
-- Bu kurulum mevcut randevu kayıtlarını silmez veya değiştirmez.

create table if not exists public.appointment_availability (
  appointment_date date not null,
  appointment_time text not null check (appointment_time in ('10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00')),
  is_open boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (appointment_date, appointment_time)
);

alter table public.appointment_availability enable row level security;
-- Önceki kısa saat listesi kısıtını kaldırır; kurulum tekrar çalıştırılabilir.
alter table public.appointment_availability
  drop constraint if exists appointment_availability_appointment_time_check;

drop policy if exists "Authenticated users manage appointment availability" on public.appointment_availability;
create policy "Authenticated users manage appointment availability"
on public.appointment_availability
for all
to authenticated
using (true)
with check (true);

-- Varsayılan çalışma düzeni:
-- Hafta içi 08:30–16:30 kapalı, 18:30–00:30 açık.
-- Hafta sonu 08:30–02:30 arasındaki bütün standart saatler açık.
-- Yönetim panelinde kaydedilen bir saat bu varsayımı o tarih için geçersiz kılar.
-- Ziyaretçiler bu fonksiyondan yalnızca saatlerin açık/dolu bilgisini alır;
-- danışan adı, telefon veya diğer randevu bilgileri asla dışarı verilmez.
create or replace function public.get_public_appointment_slots(target_date date)
returns table(slot_time text, is_available boolean)
language sql
security definer
set search_path = public
as $$
  with configured_slots as (
    select slot_time, sort_order
    from unnest(
      case
        when extract(isodow from target_date) between 1 and 5 then
          array['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30', '00:30']
        else
          array['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30', '00:30', '01:30', '02:30']
      end
    ) with ordinality as schedule(slot_time, sort_order)
  )
  select
    slots.slot_time,
    coalesce(
      availability.is_open,
      case
        when extract(isodow from target_date) between 1 and 5
          then slots.slot_time in ('18:30', '19:30', '20:30', '21:30', '22:30', '23:30', '00:30')
        else true
      end
    )
      and not exists (
        select 1
        from public.appointments appointment
        where appointment.appointment_date = target_date
          and left(appointment.appointment_time::text, 5) = slots.slot_time
          and appointment.status is distinct from 'cancelled'
      ) as is_available
  from configured_slots slots
  left join public.appointment_availability availability
    on availability.appointment_date = target_date
   and availability.appointment_time = slots.slot_time
  order by slots.sort_order;
$$;

grant execute on function public.get_public_appointment_slots(date) to anon, authenticated;

-- Eş zamanlı iki form gönderimi olsa bile aynı gün/saat için ikinci aktif randevuyu
-- engeller. İptal edilmiş randevular yeni bir talebi engellemez.
create or replace function public.prevent_duplicate_appointment_slot()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status is distinct from 'cancelled' then
    perform pg_advisory_xact_lock(hashtext(new.appointment_date::text || '|' || new.appointment_time::text));

    if exists (
      select 1
      from public.appointments appointment
      where appointment.appointment_date = new.appointment_date
        and appointment.appointment_time = new.appointment_time
        and appointment.status is distinct from 'cancelled'
        and (tg_op = 'INSERT' or appointment.id <> new.id)
    ) then
      raise exception 'Bu tarih ve saat için zaten aktif bir randevu var.'
        using errcode = '23505';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_duplicate_appointment_slot_trigger on public.appointments;
create trigger prevent_duplicate_appointment_slot_trigger
before insert or update of appointment_date, appointment_time, status
on public.appointments
for each row
execute function public.prevent_duplicate_appointment_slot();
