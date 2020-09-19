-- psql -d task4_db -U task4_user -f seeds.sql

-- TRUNCATE TABLE public.users CASCADE;
INSERT INTO public.users (user_id, login, password, age, is_deleted)
VALUES
    (cast ('00000000-0000-4000-0000-000000000000' as uuid), 'user-1',  'user-1',  20, false),
    (cast ('00000000-0000-4000-0000-000000000001' as uuid), 'user-2',  'user-2',  22, false),
    (cast ('00000000-0000-4000-0000-000000000002' as uuid), 'user-3',  'user-3',  26, false),
    (cast ('00000000-0000-4000-0000-000000000003' as uuid), 'user-4',  'user-4',  25, false),
    (cast ('00000000-0000-4000-0000-000000000004' as uuid), 'user-5',  'user-5',  30, false),
    (cast ('00000000-0000-4000-0000-000000000005' as uuid), 'user-6',  'user-6',  25, false),
    (cast ('00000000-0000-4000-0000-000000000006' as uuid), 'user-7',  'user-7',  20, false),
    (cast ('00000000-0000-4000-0000-000000000007' as uuid), 'user-8',  'user-8',  21, false),
    (cast ('00000000-0000-4000-0000-000000000008' as uuid), 'user-9',  'user-9',  22, false),
    (cast ('00000000-0000-4000-0000-000000000009' as uuid), 'user-10', 'user-10', 23, false),
    (cast ('00000000-0000-4000-0000-000000000010' as uuid), 'user-11', 'user-11', 24, false),
    (cast ('00000000-0000-4000-0000-000000000011' as uuid), 'user-12', 'user-12', 25, false),
    (cast ('00000000-0000-4000-0000-000000000012' as uuid), 'guest-1',   'bo1-1',   99, false),
    (cast ('00000000-0000-4000-0000-000000000013' as uuid), 'guest-2',   'bo1-2',   99, false),
    (cast ('00000000-0000-4000-0000-000000000014' as uuid), 'guest-3',   'bo1-3',   99, false),
    (cast ('00000000-0000-4000-0000-000000000015' as uuid), 'guest-4',   'bo1-4',   99, false),
    (cast ('00000000-0000-4000-0000-000000000016' as uuid), 'guest-5',   'bo1-5',   99, false),
    (cast ('00000000-0000-4000-0000-000000000017' as uuid), 'admin-1', 'admin-1', 30, false),
    (cast ('00000000-0000-4000-0000-000000000018' as uuid), 'admin-2', 'admin-2', 35, false),
    (cast ('00000000-0000-4000-0000-000000000019' as uuid), 'author-1', 'author-1', 33, false),
    (cast ('00000000-0000-4000-0000-000000000020' as uuid), 'author-2', 'author-2', 22, false)
;

-- TRUNCATE TABLE public.permissions CASCADE;
INSERT INTO public.permissions (permission_id, name)
VALUES
    (cast ('00000000-0000-4000-0001-000000000000' as uuid), 'READ'),
    (cast ('00000000-0000-4000-0001-000000000001' as uuid), 'WRITE'),
    (cast ('00000000-0000-4000-0001-000000000002' as uuid), 'DELETE'),
    (cast ('00000000-0000-4000-0001-000000000003' as uuid), 'SHARE'),
    (cast ('00000000-0000-4000-0001-000000000004' as uuid), 'UPLOAD_FILES')
;

-- TRUNCATE TABLE public.groups CASCADE;
INSERT INTO public.groups (group_id, name)
VALUES
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), 'admins'),
    (cast ('00000000-0000-4000-0002-000000000001' as uuid), 'subscribers'),
    (cast ('00000000-0000-4000-0002-000000000002' as uuid), 'guests'),
    (cast ('00000000-0000-4000-0002-000000000003' as uuid), 'authors')
;

-- TRUNCATE TABLE public.groups_permissions;
INSERT INTO public.groups_permissions (group_id, permission_id)
VALUES
    -- admins
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), cast ('00000000-0000-4000-0001-000000000000' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), cast ('00000000-0000-4000-0001-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), cast ('00000000-0000-4000-0001-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), cast ('00000000-0000-4000-0001-000000000003' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000000' as uuid), cast ('00000000-0000-4000-0001-000000000004' as uuid)),
    -- subscribers
    (cast ('00000000-0000-4000-0002-000000000001' as uuid), cast ('00000000-0000-4000-0001-000000000000' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000001' as uuid), cast ('00000000-0000-4000-0001-000000000003' as uuid)),
    -- guests
    (cast ('00000000-0000-4000-0002-000000000002' as uuid), cast ('00000000-0000-4000-0001-000000000000' as uuid)),
    -- authors
    (cast ('00000000-0000-4000-0002-000000000003' as uuid), cast ('00000000-0000-4000-0001-000000000000' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000003' as uuid), cast ('00000000-0000-4000-0001-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000003' as uuid), cast ('00000000-0000-4000-0001-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0002-000000000003' as uuid), cast ('00000000-0000-4000-0001-000000000003' as uuid))
;

-- TRUNCATE public.users_groups;
INSERT INTO public.users_groups (user_id, group_id)
VALUES
    -- admins
    (cast ('00000000-0000-4000-0000-000000000017' as uuid), cast ('00000000-0000-4000-0002-000000000000' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000018' as uuid), cast ('00000000-0000-4000-0002-000000000000' as uuid)),
    -- subscribers
    (cast ('00000000-0000-4000-0000-000000000000' as uuid), cast ('00000000-0000-4000-0002-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000001' as uuid), cast ('00000000-0000-4000-0002-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000002' as uuid), cast ('00000000-0000-4000-0002-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000003' as uuid), cast ('00000000-0000-4000-0002-000000000001' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000004' as uuid), cast ('00000000-0000-4000-0002-000000000001' as uuid)),
    -- guests
    (cast ('00000000-0000-4000-0000-000000000012' as uuid), cast ('00000000-0000-4000-0002-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000013' as uuid), cast ('00000000-0000-4000-0002-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000014' as uuid), cast ('00000000-0000-4000-0002-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000015' as uuid), cast ('00000000-0000-4000-0002-000000000002' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000016' as uuid), cast ('00000000-0000-4000-0002-000000000002' as uuid)),
    -- authors
    (cast ('00000000-0000-4000-0000-000000000019' as uuid), cast ('00000000-0000-4000-0002-000000000003' as uuid)),
    (cast ('00000000-0000-4000-0000-000000000020' as uuid), cast ('00000000-0000-4000-0002-000000000003' as uuid))
;
