import Ajv from 'ajv';
import userDefsSchema from './user-defs-schema';
import createUserSchema from './create-user-schema';
import updateUserSchema from './update-user-schema';

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('password', (password) =>
  (/^[-a-z0-9]{3,20}$/i).test(password) && (/[a-z]/i).test(password) && /\d/.test(password)
);

const defsSchema = ajv.addSchema(userDefsSchema);

export default ajv;
export const validateCreateUser = defsSchema.compile(createUserSchema);
export const validateUpdateUser = defsSchema.compile(updateUserSchema);
