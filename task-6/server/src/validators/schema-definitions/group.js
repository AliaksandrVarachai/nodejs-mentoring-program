export default {
  $id: 'group-schema/defs.json',
  definitions: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string',
      pattern: '^\\w+$',
      maxLength: 40,
      errorMessage: 'must contain up to 40 chars. Allowed chars: A-Z, a-z, 0-9, _'
    }
  }
};
