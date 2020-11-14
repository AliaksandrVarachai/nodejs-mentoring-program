export default {
  type: 'object',
  required: ['groupId', 'userIds'],
  additionalProperties: false,
  properties: {
    groupId: {
      type: 'string',
      format: 'uuid'
    },
    userIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid'
      }
    }
  }
};
