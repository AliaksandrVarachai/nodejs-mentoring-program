-- It's impossible to create via script a database or user/role.
-- Everything else is similar to psql initialize script.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

CREATE TABLE public.groups (
    group_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(40) UNIQUE NOT NULL CHECK (name ~ '^\w+$'),
    created_at timestamp NOT NULL default now(),
    updated_at timestamp NOT NULL default now()
);

CREATE TABLE public.users_groups (
    user_id uuid REFERENCES public.users (user_id) ON DELETE CASCADE,
    group_id uuid REFERENCES public.groups (group_id) ON DELETE CASCADE,
    created_at timestamp NOT NULL default now(),
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE public.permissions (
    permission_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(40) UNIQUE NOT NULL CHECK (name ~ '^[A-Z_][A-Z_0-9]*$'),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE public.groups_permissions (
    group_id uuid REFERENCES public.groups (group_id) ON DELETE CASCADE,
    permission_id uuid REFERENCES public.permissions (permission_id) ON DELETE CASCADE,
    created_at timestamp NOT NULL default now(),
    PRIMARY KEY (group_id, permission_id)
);

CREATE OR REPLACE FUNCTION public.trigger_set_timestamp() RETURNS trigger
LANGUAGE plpgsql
AS $function$
    begin
        NEW.updated_at = NOW();
        return NEW;
    end;
$function$;

CREATE trigger set_timestamp_users
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE function trigger_set_timestamp();

CREATE trigger set_timestamp_groups
BEFORE UPDATE ON public.groups
FOR EACH ROW EXECUTE function trigger_set_timestamp();

CREATE trigger set_timestamp_permissions
BEFORE UPDATE ON public.permissions
FOR EACH ROW EXECUTE function trigger_set_timestamp();
