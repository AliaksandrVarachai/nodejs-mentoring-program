/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getAutoSuggestUsers = getAutoSuggestUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;

var _config = require("../../config");

var _users = require("../views/users");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO: use dynamic import
function importService(dataSource) {
  switch (dataSource) {
    case _config.AVAILABLE_DATA_SOURCES.MEMORY:
      return require('../services/memory/users');

    case _config.AVAILABLE_DATA_SOURCES.PG:
      return require('../services/pg/users');

    case _config.AVAILABLE_DATA_SOURCES.KNEX:
      return require('../services/knex/users');

    default:
      throw Error("Data source \"".concat(dataSource, "\" is unknown."));
  }
}

var usersService = importService(_config.DATA_SOURCE);

function getAllUsers(_x, _x2) {
  return _getAllUsers.apply(this, arguments);
}

function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* (req, res) {
    try {
      var users = yield usersService.getAllUsers();
      res.status(200).json((0, _users.getSuccessView)(users));
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _users.getErrorView)(error.message));
    }
  });
  return _getAllUsers.apply(this, arguments);
}

function getUserById(_x3, _x4) {
  return _getUserById.apply(this, arguments);
}

function _getUserById() {
  _getUserById = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield usersService.getUserById(req.params.id);
      res.status(200).json((0, _users.getSuccessView)(user));
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _users.getErrorView)(error.message));
    }
  });
  return _getUserById.apply(this, arguments);
}

function getAutoSuggestUsers(_x5, _x6) {
  return _getAutoSuggestUsers.apply(this, arguments);
}

function _getAutoSuggestUsers() {
  _getAutoSuggestUsers = _asyncToGenerator(function* (req, res) {
    var loginSubstring = req.query['login-substring'];
    var limit = Number(req.query.limit);

    try {
      var users = yield usersService.getAutoSuggestUsers(loginSubstring, limit);
      res.status(200).json((0, _users.getSuccessView)(users));
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _users.getErrorView)(error.message));
    }
  });
  return _getAutoSuggestUsers.apply(this, arguments);
}

function createUser(_x7, _x8) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(function* (req, res) {
    var {
      login,
      password,
      age
    } = req.body;

    try {
      var newUser = yield usersService.createUser({
        login,
        password,
        age
      });
      res.status(201).json((0, _users.getSuccessView)(newUser));
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(400).json((0, _users.getErrorView)(error.message));
    }
  });
  return _createUser.apply(this, arguments);
}

function updateUser(_x9, _x10) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(function* (req, res) {
    var {
      id,
      password,
      age,
      isDeleted
    } = req.body;

    try {
      var newUser = yield usersService.updateUser({
        id,
        password,
        age,
        isDeleted
      });
      res.status(200).json((0, _users.getSuccessView)(newUser));
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _users.getErrorView)(error.message));
    }
  });
  return _updateUser.apply(this, arguments);
}

function removeUser(_x11, _x12) {
  return _removeUser.apply(this, arguments);
}

function _removeUser() {
  _removeUser = _asyncToGenerator(function* (req, res) {
    try {
      yield usersService.removeUser(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      if (_config.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _users.getErrorView)(error.message));
    }
  });
  return _removeUser.apply(this, arguments);
}