-- psql -d task4_db -U task4_user -f seeds-revert.sql

TRUNCATE public.users_groups;
TRUNCATE TABLE public.groups_permissions;
TRUNCATE TABLE public.groups CASCADE;
TRUNCATE TABLE public.permissions CASCADE;
TRUNCATE TABLE public.users CASCADE;
