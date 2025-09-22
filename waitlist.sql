create extension if not exists "uuid-ossp";

create table if not exists public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    name text,
    email text not null unique,
    source text default 'landing_v1',
    consent boolean default true,
    created_at timestamp with time zone default now()
);

create index if not exists waitlist_email_idx on public.waitlist (email);
