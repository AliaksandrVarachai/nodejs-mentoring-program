export default {
  $id: 'group-schema/create-group.json',
  type: 'object',
  required: ['name'],
  additionalProperties: false,
  properties: {
    name: { $ref: 'defs.json#/definitions/name' }
  }
};
