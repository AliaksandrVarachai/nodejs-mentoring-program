-- psql -U postgres -f init-db.sql -v userName=task4_user -v dbName=task4_db -v userPassword=\'111\'

-- DROP DATABASE :dbName
CREATE DATABASE :dbName;

\set readWriteRole task4_readwrite

-- DROP ROLE :userName;
CREATE ROLE :readWriteRole;

-- REVOKE CONNECT
-- ON DATABASE :dbName
-- FROM :readWriteRole;
GRANT CONNECT
ON DATABASE :dbName
TO :readWriteRole;

-- Connection to the created DB as a superuser
\c :dbName

-- DROP EXTENSION IF EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE public.users
CREATE TABLE public.users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    login varchar(20) UNIQUE NOT NULL CHECK (char_length(login) >= 3),
    password varchar(20) NOT NULL CHECK (char_length(login) >= 3),
    age int2 NOT NULL CHECK (age BETWEEN 4 AND 130),
    is_deleted boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
    CONSTRAINT login_check CHECK (login ~ '^[-a-z0-9]+$'),
    CONSTRAINT password_check CHECK (
        password ~ '^[-a-z\d]+$'
        AND password ~ '\d'
        AND password ~ '[a-z]'
    )
);

-- DROP TABLE public.groups
CREATE TABLE public.groups (
    group_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(40) UNIQUE NOT NULL CHECK (name ~ '^\w+$'),
    created_at timestamp NOT NULL default now(),
    updated_at timestamp NOT NULL default now()
);

-- DROP TABLE public.users_groups
CREATE TABLE public.users_groups (
    user_id uuid REFERENCES public.users (user_id),
    group_id uuid REFERENCES public.groups (group_id),
    created_at timestamp NOT NULL default now(),
    updated_at timestamp NOT NULL default now(),
    PRIMARY KEY (user_id, group_id)
);

-- DROP TABLE public.permissions
CREATE TABLE public.permissions (
    permission_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(40) UNIQUE NOT NULL CHECK (name ~ '^[A-Z_]+$'),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- DROP TABLE public.groups_permissions
CREATE TABLE public.groups_permissions (
    group_id uuid REFERENCES public.groups (group_id),
    permission_id uuid REFERENCES public.permissions (permission_id),
    created_at timestamp NOT NULL default now(),
    updated_at timestamp NOT NULL default now(),
    PRIMARY KEY (group_id, permission_id)
);

-- DROP FUNCTION IF EXISTS public.trigger_set_timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp() RETURNS trigger
LANGUAGE plpgsql
AS $function$
    begin
        NEW.updated_at = NOW();
        return NEW;
    end;
$function$;

-- DROP TRIGGER set_timestamp_users ON public.users;
CREATE trigger set_timestamp_users
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- DROP TRIGGER set_timestamp_groups ON public.groups;
CREATE trigger set_timestamp_groups
BEFORE UPDATE ON public.groups
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- DROP TRIGGER set_timestamp_permissions ON public.permissions;
CREATE trigger set_timestamp_permissions
BEFORE UPDATE ON public.permissions
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- DROP TRIGGER set_timestamp_users_groups ON public.users_groups;
CREATE trigger set_timestamp_users_groups
BEFORE UPDATE ON public.users_groups
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- DROP TRIGGER set_timestamp_groups_permissions ON public.groups_permissions;
CREATE trigger set_timestamp_groups_permissions
BEFORE UPDATE ON public.groups_permissions
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- REVOKE GRANT SELECT, INSERT, UPDATE, DELETE
-- ON ALL TABLES IN SCHEMA public
-- FROM :readWriteRole;
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO :readWriteRole;

-- DROP ROLE :userName;
CREATE ROLE :userName
WITH
    LOGIN
    PASSWORD :userPassword
;

-- REVOKE :readWriteRole FROM :userName;
GRANT :readWriteRole TO :userName;
