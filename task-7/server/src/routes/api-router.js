import express from 'express';
import * as controller from '../controllers/index.js';
import * as validators from '../validators/index.js';

const router = express.Router();

router.get('/users/all', controller.getAllUsers);
router.get('/users/auto-suggest', controller.getAutoSuggestUsers);
router.get('/users/:id', controller.getUserById);
router.put('/users/create', validators.validateCreateUser, controller.createUser);
router.patch('/users/update', validators.validateUpdateUser, controller.updateUser);
router.delete('/users/remove/:id', controller.removeUser);

router.get('/groups/all', controller.getAllGroups);
router.get('/groups/:id', controller.getGroupById);
router.put('/groups/create', validators.validateCreateGroup, controller.createGroup);
router.delete('/groups/delete/:id', controller.deleteGroup);

router.get('/permissions/all', controller.getAllPermissions);
router.get('/permissions/:id', controller.getPermissionById);
router.put('/permissions/create', validators.validateCreatePermission, controller.createPermission);
router.delete('/permissions/delete/:id', controller.deletePermission);

router.post('/add-users-to-group', validators.validateAddUsersToGroup, controller.addUsersToGroup);
router.delete('/delete-users-from-group', validators.validateDeleteUsersFromGroup, controller.deleteUsersFromGroup);
router.post('/add-permissions-to-group', validators.validateAddPermissionsToGroup, controller.addPermissionsToGroup);
router.delete('/delete-permissions-from-group', validators.validateDeletePermissionsFromGroup,
  controller.deletePermissionsFromGroup);
router.get('/user-permissions/:id', controller.getUserPermissions);
router.get('/user-groups/:id', controller.getUserGroups);
router.get('/group-users/:id', controller.getGroupUsers);
router.get('/group-permissions/:id', controller.getGroupPermissions);
router.get('/permission-groups/:id', controller.getPermissionGroups);
router.get('/permission-users/:id', controller.getPermissionUsers);

router.get('/handled-error', controller.getHandledError);
router.get('/unhandled-error', controller.getUnhandledError);

export default router;
