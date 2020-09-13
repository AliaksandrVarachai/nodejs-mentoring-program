/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = {
  $id: 'user-schema/defs.json',
  definitions: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    login: {
      type: 'string',
      pattern: '^[-a-z\\d]{3,20}$',
      errorMessage: 'must contain 3-20 chars. Allowed chars: a-z, 0-9, -'
    },
    password: {
      type: 'string',
      format: 'password',
      errorMessage: 'must contain 3-20 chars. Allowed chars: a-z, 0-9, -. At least one letter and number must be provided'
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
exports.default = _default;