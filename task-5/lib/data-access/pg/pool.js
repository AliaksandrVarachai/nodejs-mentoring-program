/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _server = require("../../../config/server");

var _default = new _pg.Pool({
  host: _server.DB_HOST,
  port: _server.DB_PORT,
  database: _server.DB_NAME,
  user: _server.DB_USER,
  password: _server.DB_PASSWORD
});

exports.default = _default;