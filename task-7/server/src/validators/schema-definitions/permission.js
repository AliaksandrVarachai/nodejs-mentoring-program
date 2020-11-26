export default {
  $id: 'permission-schema/defs.json',
  definitions: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string',
      pattern: '^[A-Z0-9_]+$',
      maxLength: 40,
      errorMessage: 'must contain up to 40 chars. Allowed chars: A-Z, 0-9, _, cannot start with a number'
    }
  }
};
