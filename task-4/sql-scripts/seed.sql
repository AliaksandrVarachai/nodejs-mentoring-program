-- TRUNCATE TABLE public.users;
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