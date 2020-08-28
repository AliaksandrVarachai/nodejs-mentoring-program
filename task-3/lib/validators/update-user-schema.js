/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = {
  $id: 'user-schema/update-user.json',
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      $ref: 'defs.json#/definitions/id'
    },
    password: {
      $ref: 'defs.json#/definitions/password'
    },
    age: {
      $ref: 'defs.json#/definitions/age'
    },
    isDeleted: {
      $ref: 'defs.json#/definitions/isDeleted'
    }
  }
};
exports.default = _default;