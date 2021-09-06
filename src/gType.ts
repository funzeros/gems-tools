/**
 * @module gType
 * @type function tools
 */

/**
 * @title isType
 * @description 判断类型的基础方法 柯里化函数
 * @param type string 类型字符串
 * @param val 判断的值
 * @returns boolean
 * @example isType('String')('测试用例');
 */
const isType =
  <T = any>(type: string) =>
  (val: T) =>
    Object.prototype.toString.call(val) === `[object ${type}]`;
/**
 * @title isObject
 * @param val
 * @returns boolean
 */
const isObject = (val: object) =>
  typeof val === "function" || (typeof val === "object" && !!val);
/**
 * @title isEmptyObject
 * @param val
 * @returns boolean
 */
const isEmptyObject = (val: object) =>
  isObject(val) && JSON.stringify(val) == "{}";
/**
 * @title isArray
 * @param val
 * @returns boolean
 */
const isArray = (val: any[]) => Array.isArray(val);
/**
 * @title isArguments
 * @param val
 * @returns boolean
 */
const isArguments = isType("Arguments");
/**
 * @title isNull
 * @param val
 * @returns boolean
 */
const isNull = isType("Null");
/**
 * @title isNumber
 * @param val
 * @returns boolean
 */
const isNumber = isType("Number");
/**
 * @title isString
 * @param val
 * @returns boolean
 */
const isString = isType("String");
/**
 * @title isBoolean
 * @param val
 * @returns boolean
 */
const isBoolean = isType("Boolean");
/**
 * @title isFunction
 * @param val
 * @returns boolean
 */
const isFunction = isType("Function");
/**
 * @title isPromise
 * @param val
 * @returns boolean
 */
const isPromise = isType("Promise");
/**
 * @title isDate
 * @param val
 * @returns boolean
 */
const isDate = isType("Date");
/**
 * @title isRegExp
 * @param val
 * @returns boolean
 */
const isRegExp = isType("RegExp");
/**
 * @title isMap
 * @param val
 * @returns boolean
 */
const isMap = isType("Map");
/**
 * @title isSet
 * @param val
 * @returns boolean
 */
const isSet = isType("Set");
/**
 * @title isSymbol
 * @param val
 * @returns boolean
 */
const isSymbol = isType("Symbol");
/**
 * @title isError
 * @param val
 * @returns boolean
 */
const isError = isType("Error");
/**
 * @title isUndefined
 * @param val
 * @returns boolean
 */
const isUndefined = isType("Undefined");
/**
 * @title isEmpty
 * @param val
 * @returns boolean
 */
const isEmpty = (val?: null) => isNull(val) || isUndefined(val);
/**
 * @title isNaN
 * @param val
 * @returns boolean
 */
const isNaN = (val: number) => Number.isNaN(val);
/**
 * @title isElement
 * @param val
 * @returns boolean
 */
const isElement = (val: HTMLElement) =>
  isObject(HTMLElement)
    ? val instanceof HTMLElement
    : isObject(val) && isString(val.nodeName) && val.nodeType === 1;

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
