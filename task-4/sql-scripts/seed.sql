-- TRUNCATE TABLE public.users CASCADE;
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

-- TRUNCATE TABLE public.permissions CASCADE;
INSERT INTO public.permissions (name)
VALUES
    ('READ'),
    ('WRITE'),
    ('DELETE'),
    ('SHARE'),
    ('UPLOAD_FILES')
;

-- TRUNCATE TABLE public.groups CASCADE;
INSERT INTO public.groups (name) (
VALUES
    ('admins'),
    ('subscribers'),
    ('guests'),
    ('writers')
);

-- getAllGroups() : [{group_id, name}]
SELECT group_id, name FROM public.groups;

-- getGroupById(uuid) : [{group_id, name, permissions[]}]
SELECT

/* groups */
-- createGroup(name) : {id, name}
-- deleteGroup(groupId) : number of deleted records
-- getGroupById(uuid) : {group_id, name, permissions[]}
-- getAllGroups() : [{group_id, name}]

/* users */
-- users: add, get, update, remove;    getAll, getProposedUser -> this all is IMPLEMENTED

/* permissions */
-- createPermission(name) : {id, name}
-- deletePermission(permissionId) : boolean
-- getPermissionById(uuid) : {permission_id, name}
-- getAllPermissions() : [{permission_id, name}]

/* users_groups */
-- addUsersToGroup(groupId, userIds[]) : userIds[]
-- deleteUsersFromGroup(groupId, userIds) : userIds[]

/* groups_permissions */
-- addGroupPermissions(groupId, permissionIds[]) : permissionIds[]
-- deleteGroupPermissions(groupId, permissionIds[]) : permissionIds[]

/* others */
-- getUserPermissions(userId, permissionIds) : permissionIds[]



/******* groups *******/

-- createGroup(name) : {id, name}
INSERT INTO public.groups (name) VALUES ($name)
RETURNING group_id, name;

-- deleteGroup(groupId) : number of deleted records
DELETE FROM public.groups
WHERE group_id = $groupId;

-- getGroupById(uuid) : {groupId, name, permissionIds[]}
SELECT
    g.group_id,
    g.name,
    ARRAY (
        SELECT gp.permission_id FROM public.groups_permissions AS gp
        WHERE gp.group_id = $groupId
    ) AS permission_ids
FROM public.groups as g
WHERE g.group_id = $groupId;

-- getAllGroups() : [{group_id, name}]
SELECT group_id, name FROM public.groups;


/******* permissions *******/

-- createPermission(name) : {id, name}
INSERT INTO public.permissions (name)
VALUES ($name)
RETURNING permission_id, name;

-- deletePermission(permissionId) : number of deleted records
DELETE FROM public.permissions
WHERE permission_id = $permissionId;

-- getPermissionById(uuid) : {permissionId, name}
SELECT permission_id, name FROM public.permissions
WHERE permission_id = $permissionId;

-- getAllPermissions() : [{permission_id, name}]
SELECT permission_id, name FROM public.permissions;


/******* users_groups *******/

-- TODO: transaction??
-- addUsersToGroup(groupId, userIds[]) : userIds[]
INSERT INTO public.users_groups (group_id, user_id)
SELECT $groupId AS group_id, t.user_id
FROM unnest($userIds) AS t(user_id)
ON CONFLICT DO nothing
RETURNING user_id;
--group: '0fcbf6ed-cfe7-4dc0-8de3-9dfc922ff96b'
--users: 'cd795115-2873-44e0-9833-d705773e2fdc', '6a5b07ad-8c78-4c04-b1d1-3fe534b7653c', '6d28fabc-9ad4-4aea-a2b6-058ee8ce63b4'

-- TODO: transaction??
-- deleteUsersFromGroup(groupId, userIds[]) : userIds[]
DELETE FROM public.users_groups AS ug
WHERE ug.group_id = $groupId AND ug.user_id = ANY($userIds)
RETURNING user_id;


/******* groups_permissions *******/

-- TODO: transaction??
-- addGroupPermissions(groupId, permissionIds[]) : permissionIds[]
INSERT INTO public.groups_permissions (group_id, permission_id)
SELECT $groupId AS group_id, t.permission_id
FROM unnest($permissionIds) AS t(permission_id)
ON CONFLICT DO nothing
RETURNING permission_id;
--group: '0fcbf6ed-cfe7-4dc0-8de3-9dfc922ff96b'
--permissions: 'f614e1f3-a2ef-476c-8e92-59040c2a08a5', 'e70983eb-41a5-4def-8b49-08ebcf8d7efb', 'ef0b8499-d18a-417e-96ae-d59d632ab146'

-- TODO: transaction??
-- deleteGroupPermissions(groupId, permissionIds[]) : permissionIds[]
DELETE FROM public.groups_permissions AS gp
WHERE gp.group_id = $groupId AND gp.group_id = ANY($permissionIds)
RETURNING permission_id;


/******* others *******/
-- getUserPermissions(userId) : permissionIds[]
WITH found_groups AS (
    SELECT ug.group_id FROM public.users_groups AS ug
    WHERE ug.user_id = $userId
)
SELECT DISTINCT permission_id FROM public.groups_permissions AS gp
WHERE gp.group_id IN (SELECT group_id FROM found_groups);





CREATE OR REPLACE FUNCTION public.getPermissionId(name text) RETURNS text
LANGUAGE sql
AS $$
    SELECT permission_id FROM public.permissions
    WHERE name = $1;
$$;

CREATE OR REPLACE FUNCTION public.getGroupId(name text) RETURNS text
LANGUAGE sql
AS $$
    SELECT group_id FROM public.groups
    WHERE name = $1;
$$;

CREATE OR REPLACE FUNCTION public.addGroupPermissions(groupId uuid, userIds uuid[]) RETURNS boolean
LANGUAGE sql
DECLARE
    _userId uuid;
AS $$
    FOREACH _userId IN ARRAY userIds
    LOOP
        INSERT INTO public.groups_permissions
        VALUES (groupId, userIds) -- TODO: replace with query (uuid CROSS JOIN userIds)
        ON CONFLICT

        ;
    END LOOP;

$$;

-- TRUNCATE TABLE public.groups_permissions CASCADE;
INSERT INTO public.groups_permissions (group_id, permission_id)
SELECT
    ;






