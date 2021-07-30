const isType =
  <T = any>(type: string) =>
  (val: T) =>
    Object.prototype.toString.call(val) === `[object ${type}]`;
const isObject = (val: object) =>
  typeof val === "function" || (typeof val === "object" && !!val);
const isEmptyObject = (val: object) =>
  isObject(val) && JSON.stringify(val) == "{}";
const isArray = (val: any[]) => Array.isArray(val);
const isArguments = isType("Arguments");
const isNull = isType("Null");
const isNumber = isType("Number");
const isString = isType("String");
const isBoolean = isType("Boolean");
const isFunction = isType("Function");
const isPromise = isType("Promise");
const isDate = isType("Date");
const isRegExp = isType("RegExp");
const isMap = isType("Map");
const isSet = isType("Set");
const isSymbol = isType("Symbol");
const isError = isType("Error");
const isUndefined = isType("Undefined");
const isEmpty = (val?: null) => isNull(val) || isUndefined(val);
const isNaN = (val: number) => Number.isNaN(val);
const isElement = (val: HTMLElement) =>
  isObject(HTMLElement)
    ? val instanceof HTMLElement
    : isObject(val) && isString(val.nodeName) && val.nodeType === 1;

const gTypes = {
  isType,
  isObject,
  isEmpty,
  isEmptyObject,
  isArray,
  isArguments,
  isNull,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isPromise,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isSymbol,
  isError,
  isUndefined,
  isNaN,
  isElement,
};
export {
  isType,
  isObject,
  isEmpty,
  isEmptyObject,
  isArray,
  isArguments,
  isNull,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isPromise,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isSymbol,
  isError,
  isUndefined,
  isNaN,
  isElement,
};
export default gTypes;
