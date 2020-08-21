export default {
  $id: 'user-schema/defs.json',
  definitions: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    login: {
      type: 'string',
      pattern: '[-a-z\\d]{3,20}'
    },
    password: {
      type: 'string',
      format: 'password'
    },
    age: {
      type: 'integer',
      minimum: 4,
      maximum: 130
    },
    isDeleted: {
      type: 'boolean'
    }
  }
};
