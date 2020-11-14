export default {
  $id: 'user-schema/create-user.json',
  type: 'object',
  required: ['login', 'password', 'age'],
  additionalProperties: false,
  properties: {
    login: { $ref: 'defs.json#/definitions/login' },
    password: { $ref: 'defs.json#/definitions/password' },
    age: { $ref: 'defs.json#/definitions/age' }
  }
};
