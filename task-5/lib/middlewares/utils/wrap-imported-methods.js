/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapImportedMethods;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Takes an imported object and wraps all methods with runs provided functions before and after the method call.
 * Example of using for default import: import * as exportedList from 'some-tracked-library'.
 * @param {object} imported - imported object.
 * @param {function} runBefore - accepts the methodName arg plus all method arguments.
 * @param {function} runAfter - accepts the methodName arg plus all method arguments.
 *
 * @example Import a default method:
 * import * as exportedList from 'some-tracked-library';
 *
 * @example Import not default methods:
 * import defaultMethod from 'some-tracked-library';
 */
function wrapImportedMethods(imported) {
  var runBefore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
  var runAfter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};

  if (typeof imported !== 'object') {
    throw Error('Object is required, try: "import * as exportedList from \'some-library\'"');
  }

  var reExport = {};
  Object.keys(imported).forEach(key => {
    var value = imported[key];
    if (typeof value !== 'function') return reExport[key] = value;
    reExport[key] = wrapMethod(key, value, runBefore, runAfter);
  });
  return reExport;
}

function wrapMethod(methodName, method, runBefore, runAfter) {
  if (typeof method !== 'function') throw Error('Function must be provided.');

  if (typeof method.then === 'function') {
    return (req, res) => /*#__PURE__*/_asyncToGenerator(function* () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      runBefore(req, res, methodName, ...args);
      var result = yield method.apply(this, args);
      runAfter(req, res, methodName, ...args);
      return result;
    });
  }

  return (req, res) => function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    runBefore(req, res, methodName, ...args);
    var result = method.apply(this, args);
    runAfter(req, res, methodName, ...args);
    return result;
  };
}