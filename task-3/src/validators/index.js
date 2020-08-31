import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { LOG_ERRORS } from '../../config';
import { getErrorView } from '../views/users';
import userDefsSchema from './user-defs-schema';
import createUserSchema from './create-user-schema';
import updateUserSchema from './update-user-schema';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

ajv.addFormat('password', (password) =>
  (/^[-a-z0-9]{3,20}$/i).test(password) && (/[a-z]/i).test(password) && /\d/.test(password)
);

const defsSchema = ajv.addSchema(userDefsSchema);
export const _validateCreateUser = defsSchema.compile(createUserSchema);
export const _validateUpdateUser = defsSchema.compile(updateUserSchema);


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
    const message = ajv.errorsText(_validateCreateUser.errors);
    if (LOG_ERRORS) console.log(message);
    return res.status(400).json(getErrorView(message));
  }
  return next();
}
