/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = {
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
exports.default = _default;