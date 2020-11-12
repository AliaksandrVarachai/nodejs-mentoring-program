/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var controller = _interopRequireWildcard(require("../controllers"));

var validators = _interopRequireWildcard(require("../validators"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
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
router.delete('/delete-permissions-from-group', validators.validateDeletePermissionsFromGroup, controller.deletePermissionsFromGroup);
router.get('/user-permissions/:id', controller.getUserPermissions);
router.get('/user-groups/:id', controller.getUserGroups);
router.get('/group-users/:id', controller.getGroupUsers);
router.get('/handled-error', controller.getHandledError);
router.get('/unhandled-error', controller.getUnhandledError);
var _default = router;
exports.default = _default;