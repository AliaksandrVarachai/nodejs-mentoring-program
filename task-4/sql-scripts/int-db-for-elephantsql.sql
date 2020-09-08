-- It's impossible to create via script a database or user/role.
-- Everything else is similar to psql initialize script.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,                     -- PRIMARY KEY
    external_id uuid DEFAULT uuid_generate_v4(),                       -- Key for external communication
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


CREATE OR REPLACE FUNCTION public.trigger_set_timestamp() RETURNS trigger
LANGUAGE plpgsql
AS $function$
    begin
        NEW.updated_at = NOW();
        return NEW;
    end;
$function$;


CREATE trigger set_timestamp_permissions
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE function trigger_set_timestamp();


INSERT INTO public.users (login, password, age, is_deleted)
VALUES
    ('user-1',  'user-1',  20, false),
    ('user-2',  'user-2',  22, false),
    ('user-3',  'user-3',  26, false),
    ('user-4',  'user-4',  25, false),
    ('user-5',  'user-5',  30, false),
    ('user-6',  'user-6',  25, false),
    ('user-7',  'user-7',  20, false),
    ('user-8',  'user-8',  21, false),
    ('user-9',  'user-9',  22, false),
    ('user-10', 'user-10', 23, false),
    ('user-11', 'user-11', 24, false),
    ('user-12', 'user-12', 25, false),
    ('bot-1',   'bo1-1',   99, false),
    ('bot-2',   'bo1-2',   99, false),
    ('bot-3',   'bo1-3',   99, false),
    ('bot-4',   'bo1-4',   99, false),
    ('bot-5',   'bo1-5',   99, false),
    ('admin-1', 'admin-1', 30, false),
    ('admin-2', 'admin-2', 35, false)
;
