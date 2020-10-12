/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = require("../../config/server");

var pgService = _interopRequireWildcard(require("../services/pg"));

var knexService = _interopRequireWildcard(require("../services/knex"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var serviceProvider = (() => {
  switch (_server.DATA_SOURCE) {
    case _server.AVAILABLE_DATA_SOURCES.PG:
      return pgService;

    case _server.AVAILABLE_DATA_SOURCES.KNEX:
      return knexService;

    default:
      throw Error("Data source \"".concat(_server.DATA_SOURCE, "\" is unknown."));
  }
})();

var _default = serviceProvider;
exports.default = _default;