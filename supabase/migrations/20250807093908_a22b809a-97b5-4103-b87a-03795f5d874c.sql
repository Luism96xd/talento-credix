-- Create schema mayoreo if not exists (safe)
create schema if not exists mayoreo;

-- Phases table
create table if not exists mayoreo.phases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Processes table
create table if not exists mayoreo.processes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  is_active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Join table for process phases with ordering
create table if not exists mayoreo.process_phases (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references mayoreo.processes(id) on delete cascade,
  phase_id uuid not null references mayoreo.phases(id) on delete restrict,
  position int not null,
  created_at timestamptz not null default now(),
  unique(process_id, phase_id),
  unique(process_id, position)
);

-- Add current_phase_id to candidates if not exists
alter table if exists mayoreo.candidates
  add column if not exists current_phase_id uuid references mayoreo.phases(id);

-- Trigger to update updated_at columns
create or replace function mayoreo.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Attach triggers to phases and processes
create trigger trg_phases_updated
before update on mayoreo.phases
for each row execute function mayoreo.update_updated_at();

create trigger trg_processes_updated
before update on mayoreo.processes
for each row execute function mayoreo.update_updated_at();

-- Enable RLS
alter table mayoreo.phases enable row level security;
alter table mayoreo.processes enable row level security;
alter table mayoreo.process_phases enable row level security;

-- Policies: simple open for authenticated users (and readable by anon for form)
-- View policies
create policy if not exists "Phases are viewable by everyone"
  on mayoreo.phases for select using (true);
create policy if not exists "Processes are viewable by everyone"
  on mayoreo.processes for select using (true);
create policy if not exists "Process phases are viewable by everyone"
  on mayoreo.process_phases for select using (true);

-- Insert/Update/Delete: allow authenticated users
create policy if not exists "Authenticated can manage phases"
  on mayoreo.phases for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy if not exists "Authenticated can manage processes"
  on mayoreo.processes for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy if not exists "Authenticated can manage process phases"
  on mayoreo.process_phases for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- Helpful view: first phase per process
create or replace view mayoreo.v_process_first_phase as
  select pp.process_id, pp.phase_id
  from (
    select process_id, phase_id, position,
           row_number() over(partition by process_id order by position asc) as rn
    from mayoreo.process_phases
  ) pp
  where rn = 1;
