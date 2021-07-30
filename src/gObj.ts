import { isEmpty, isObject } from "./gType";

/**
 * 获取keys
 * @param data
 * @returns
 */
const keys = <T>(data: T) => {
  return Object.keys(data) as (keyof T)[];
};

/**
 * 忽略某些属性
 * @param origin
 * @param callback
 * @returns
 */
const omitBy = <T>(origin: T, callback: Function) => {
  return keys(origin).reduce((acc, key) => {
    if (callback(origin[key])) acc[key as string] = origin[key];
    return acc;
  }, {});
};
/**
 * 获取数组交集
 * @param arrT
 * @param arrR
 * @returns
 */
const intersection = <T extends any[], R extends any[]>(arrT: T, arrR: R) => {
  return arrT.filter((m) => arrR.includes(m));
};
/**
 * 挑选某些属性
 * @param origin
 * @param propList
 * @returns
 */
const pick = <T>(origin: T, propList: (keyof T)[]) => {
  return keys(origin).reduce((acc, key) => {
    if (propList.includes(key)) acc[key as string] = origin[key];
    return acc;
  }, {});
};
/**
 * 浅拷贝
 * @param origin
 * @param result
 * @returns
 */
const clone = <T extends Object>(origin: T, result = {}): T => {
  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      result[prop as string] = origin[prop];
    }
  }
  return result as T;
};
/**
 * 深拷贝
 * @param data
 * @param weak
 * @returns
 */
const deepClone = <T>(data: any, weak = new WeakMap()): T => {
  if (typeof data !== "object" || data === null) return data;
  let result: T;
  const Constructor = data.constructor;
  switch (Constructor) {
    case RegExp:
      result = new Constructor(data);
      break;
    case Date:
      result = new Constructor(data.getTime());
      break;
    default:
      if (weak.has(data)) return weak.get(data);
      result = new Constructor();
      weak.set(data, result);
  }
  for (let key in data) {
    result[key] = isObject(data[key]) ? deepClone(data[key], weak) : data[key];
  }
  return result as T;
};
/**
 * 合并对象
 * @param target
 * @param args
 * @returns
 */
const extend = (target: object, ...args: any[]) =>
  Object.assign(target, ...args);

/**
 * 根据保留/删除(keep/remove)类型过滤字段
 * @param type
 * @returns
 */
const filterKeys =
  (type: "keep" | "remove") =>
  (obj: { [x: string]: any }, keys: string[] = []) =>
    Object.keys(obj).reduce((acc, key) => {
      if (type === "keep" ? keys.includes(key) : !keys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
/**
 *  保留给定字段
 */
const keepKeys = filterKeys("keep");
/**
 * 删除给定字段
 */
const removeKeys = filterKeys("remove");
/**
 * 替换对象字段名
 * @param obj
 * @param rules
 * @returns
 */
const replaceKeys = <T, R = any>(
  obj: T,
  rules: { [k in keyof T]: string }
): R => {
  const keyList = Object.keys(rules);
  return Object.keys(obj).reduce((acc, key) => {
    acc[keyList.includes(key) ? rules[key] : key] = obj[key];
    return acc;
  }, {} as R);
};

/**
 * 覆盖对象属性
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 */
function mergeProperties<T, R>(distObject: T, srcObject: R) {
  const distPropList = keys(distObject);
  const srcPropList = keys(omitBy(srcObject, isEmpty));
  const propList = intersection(distPropList, srcPropList);
  return {
    ...distObject,
    ...pick(srcObject, propList),
  };
}
export {
  clone,
  deepClone,
  extend,
  filterKeys,
  keepKeys,
  removeKeys,
  replaceKeys,
  mergeProperties,
  keys,
  omitBy,
  intersection,
  pick,
};
const gObj = {
  clone,
  deepClone,
  extend,
  filterKeys,
  keepKeys,
  removeKeys,
  replaceKeys,
  mergeProperties,
  keys,
  omitBy,
  intersection,
  pick,
};
export default gObj;
