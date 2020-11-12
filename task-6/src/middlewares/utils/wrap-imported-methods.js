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
export default function wrapImportedMethods(imported, runBefore = () => {}, runAfter = () => {}) {
  if (typeof imported !== 'object') {
    throw Error('Object is required, try: "import * as exportedList from \'some-library\'"');
  }
  const reExport = {};
  Object.keys(imported).forEach(key => {
    const value = imported[key];
    if (typeof value !== 'function') return reExport[key] = value;
    reExport[key] = wrapMethod(key, value, runBefore, runAfter);
  });
  return reExport;
}

function wrapMethod(methodName, method, runBefore, runAfter) {
  if (typeof method !== 'function') throw Error('Function must be provided.');
  if (typeof method.then === 'function') {
    return (req, res) => async function (...args) {
      runBefore(req, res, methodName, ...args);
      const result = await method.apply(this, args);
      runAfter(req, res, methodName, ...args);
      return result;
    };
  }
  return (req, res) => function (...args) {
    runBefore(req, res, methodName, ...args);
    const result = method.apply(this, args);
    runAfter(req, res, methodName, ...args);
    return result;
  };
}
