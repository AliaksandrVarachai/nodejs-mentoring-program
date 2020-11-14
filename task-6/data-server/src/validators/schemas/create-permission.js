export default {
  $id: 'permission-schema/create-permission.json',
  type: 'object',
  required: ['name'],
  additionalProperties: false,
  properties: {
    name: { $ref: 'defs.json#/definitions/name' }
  }
};
