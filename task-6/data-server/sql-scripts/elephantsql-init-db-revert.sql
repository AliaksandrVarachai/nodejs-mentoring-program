DROP TRIGGER IF EXISTS set_timestamp_permissions ON public.permissions;
DROP TRIGGER IF EXISTS set_timestamp_groups ON public.groups;
DROP TRIGGER IF EXISTS set_timestamp_users ON public.users;
DROP FUNCTION IF EXISTS public.trigger_set_timestamp
DROP TABLE IF EXISTS public.groups_permissions;
DROP TABLE IF EXISTS public.permissions;
DROP TABLE IF EXISTS public.users_groups;
DROP TABLE IF EXISTS public.groups;
DROP TABLE IF EXISTS public.users;
DROP EXTENSION IF EXISTS "uuid-ossp";
