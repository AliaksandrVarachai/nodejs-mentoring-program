import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { LOG_ERRORS } from '../../config/config';
import { getErrorView } from '../views';
import userDefinition from './schema-definitions/user';
import groupDefinition from './schema-definitions/group';
import permissionDefinition from './schema-definitions/permission';
import createUserSchema from './schemas/create-user';
import updateUserSchema from './schemas/update-user';
import createGroupSchema from './schemas/create-group';
import createPermissionSchema from './schemas/create-permission';
import addUsersToGroupSchema from './schemas/add-users-to-group';
import deleteUsersFromGroupSchema from './schemas/delete-users-from-group';
import addPermissionsToGroupSchema from './schemas/add-permissions-to-group';
import deletePermissionsFromGroupSchema from './schemas/delete-permissions-from-group';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

ajv.addFormat('password', (password) =>
  (/^[-a-z0-9]{3,20}$/i).test(password) && (/[a-z]/i).test(password) && /\d/.test(password)
);

const _userDefinition = ajv.addSchema(userDefinition);
const _groupDefinition = ajv.addSchema(groupDefinition);
const _permissionDefinition = ajv.addSchema(permissionDefinition);

const _validateCreateUser = _userDefinition.compile(createUserSchema);
const _validateUpdateUser = _userDefinition.compile(updateUserSchema);
const _validateCreateGroup = _groupDefinition.compile(createGroupSchema);
const _validateCreatePermission = _permissionDefinition.compile(createPermissionSchema);

const _validateAddUsersToGroup = ajv.compile(addUsersToGroupSchema);
const _validateDeleteUsersFromGroup = ajv.compile(deleteUsersFromGroupSchema);
const _validateAddPermissionsToGroup = ajv.compile(addPermissionsToGroupSchema);
const _validateDeletePermissionsFromGroup = ajv.compile(deletePermissionsFromGroupSchema);

// TODO: validate the rest of params

export function validateCreateUser(req, res, next) {
  const { login, password, age } = req.body;
  if (!_validateCreateUser({ login, password, age })) {
    const message = ajv.errorsText(_validateCreateUser.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateUpdateUser(req, res, next) {
  const { id, password, age, isDeleted } = req.body;
  if (!_validateUpdateUser({ id, password, age, isDeleted })) {
    const message = ajv.errorsText(_validateUpdateUser.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateCreateGroup(req, res, next) {
  const { name } = req.body;
  if (!_validateCreateGroup({ name })) {
    const message = ajv.errorsText(_validateCreateGroup.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateCreatePermission(req, res, next) {
  const { name } = req.body;
  if (!_validateCreatePermission({ name })) {
    const message = ajv.errorsText(_validateCreatePermission.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateAddUsersToGroup(req, res, next) {
  const { groupId, userIds } = req.body;
  if (!_validateAddUsersToGroup({ groupId, userIds })) {
    const message = ajv.errorsText(_validateAddUsersToGroup.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateDeleteUsersFromGroup(req, res, next) {
  const { groupId, userIds } = req.body;
  if (!_validateDeleteUsersFromGroup({ groupId, userIds })) {
    const message = ajv.errorText(_validateDeleteUsersFromGroup.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateAddPermissionsToGroup(req, res, next) {
  const { groupId, permissionIds } = req.body;
  if (!_validateAddPermissionsToGroup({ groupId, permissionIds })) {
    const message = ajv.errorsText(_validateAddPermissionsToGroup.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}

export function validateDeletePermissionsFromGroup(req, res, next) {
  const { groupId, permissionIds } = req.body;
  if (!_validateDeletePermissionsFromGroup({ groupId, permissionIds })) {
    const message = ajv.errorsText(_validateDeletePermissionsFromGroup.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}
