export default {
  type: 'object',
  required: ['groupId', 'permissionIds'],
  additionalProperties: false,
  properties: {
    groupId: {
      type: 'string',
      format: 'uuid'
    },
    permissionIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid'
      }
    }
  }
};
