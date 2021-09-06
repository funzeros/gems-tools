import { isEmpty, isObject } from "./gType";
import { intersection } from "./gArray";
/**
 * @module gObj
 * @type function tools
 * @description 针对对象的一些工具函数
 */
/**
 * @title keys
 * @description 获取keys 等同于Object.keys
 * @param data object
 * @returns (keyof data)[]
 */
const keys = <T>(data: T) => {
  return Object.keys(data) as (keyof T)[];
};

/**
 * @title omitBy
 * @description 忽略某些属性
 * @param origin object 需要操作的对象
 * @param callback (origin[key])=>boolean 忽略的方法 类似数组filter 用法
 * @returns object
 */
const omitBy = <T>(origin: T, callback: Function) => {
  return keys(origin).reduce((acc, key) => {
    if (callback(origin[key])) acc[key as string] = origin[key];
    return acc;
  }, {});
};

/**
 * @title pick
 * @description 挑选某些属性
 * @param origin 被操作对象
 * @param propList 需要挑选的字段数组
 * @returns object
 */
const pick = <T>(origin: T, propList: (keyof T)[]) => {
  return keys(origin).reduce((acc, key) => {
    if (propList.includes(key)) acc[key as string] = origin[key];
    return acc;
  }, {});
};
/**
 * @title clone
 * @description 浅拷贝
 * @param origin 拷贝对象
 * @returns new origin
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
 * @title deepClone
 * @description 深拷贝
 * @param data 拷贝对象 可以是正则/日期对象
 * @returns new origin
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
 * @title extend
 * @description 合并对象 基于Object.assign
 * @param target 源对象
 * @param args 其余对象
 * @returns target
 */
const extend = (target: object, ...args: any[]) =>
  Object.assign(target, ...args);

/**
 * @title filterKeys
 * @description 根据保留/删除(keep/remove)类型过滤字段 柯里化函数
 * @param type "keep"|"remove"
 * @param obj
 * @param keys  string[] 保留或者删除的数组
 * @returns object
 * @example filterKeys("keep")({a:1,b:2},['a']);
 */
const filterKeys =
  (type: "keep" | "remove") =>
  (obj: AnyObj, keys: string[] = []) =>
    Object.keys(obj).reduce((acc, key) => {
      if (type === "keep" ? keys.includes(key) : !keys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
/**
 * @title keepKeys
 * @description 保留给定字段 filterKeys("keep")
 * @param obj
 * @param keys  string[] 保留或者删除的数组
 * @returns object
 */
const keepKeys = filterKeys("keep");
/**
 * @title removeKeys
 * @description 删除给定字段 filterKeys("remove")
 * @param obj
 * @param keys  string[] 保留或者删除的数组
 * @returns object
 */
const removeKeys = filterKeys("remove");
/**
 * @title replaceKeys
 * @description 替换对象字段名
 * @param obj
 * @param rules {[key in obj]:newKey}
 * @returns object
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
 * @title mergeProperties
 * @description 覆盖对象属性 以初始化对象为基准 去除新对象多余字段，为缺失字段填充默认值，浅操作，仅对第一层字段有效
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 * @returns object
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
  pick,
};
