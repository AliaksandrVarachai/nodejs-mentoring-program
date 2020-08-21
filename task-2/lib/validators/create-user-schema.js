/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = {
  $id: 'user-schema/create-user.json',
  type: 'object',
  required: ['login', 'password', 'age'],
  additionalProperties: false,
  properties: {
    login: {
      $ref: 'defs.json#/definitions/login'
    },
    password: {
      $ref: 'defs.json#/definitions/password'
    },
    age: {
      $ref: 'defs.json#/definitions/age'
    }
  }
};
exports.default = _default;