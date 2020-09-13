/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = {
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
exports.default = _default;