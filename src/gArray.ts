/**
 * @module gArray
 * @type function tools
 * @description 针对数组的一些工具函数
 */

import { removeKeys } from "./gObj";
import { isFunction } from "./gType";

/**
 * @title forEachType
 * @description 从左/右（left/right）遍历数组 柯里化函数
 * @param type "left" | "right"
 * @param arr T[]
 * @param cb (value: T, index: number, array: T[]) => void
 * @returns array T[]
 * @example forEachType("right")([1,2,3],(v,k,arr)=>console.log(v,k,arr)]);
 */

const forEachType =
  (type: "left" | "right" = "left") =>
  <T>(arr: T[], cb: (value: T, index: number, array: T[]) => void) => {
    const list = type === "left" ? arr : [...arr].reverse();
    list.forEach(cb);
  };

/**
 * @title forEach
 * @description 左遍历
 * @param arr T[]
 * @param cb (value: T, index: number, array: T[]) => void
 * @returns array T[]
 */
const forEach = forEachType();

/**
 * @title forEachRight
 * @description 右遍历
 * @param arr T[]
 * @param cb (value: T, index: number, array: T[]) => void
 * @returns array T[]
 */
const forEachRight = forEachType("right");

/**
 * @title isArrayLike
 * @description 判断是否类数组
 * @param val any
 * @returns boolean
 */
const isArrayLike = (val: any) => {
  try {
    return "length" in val;
  } catch {
    return false;
  }
};

/**
 * @title flatten
 * @description 拉平数组
 * @param arr array
 * @param depth depth 最多拉平的层级 默认1
 * @returns array
 */
const flatten = <T>(arr: T[], depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

/**
 * @title deepFlatten
 * @description 深度拉平数组
 * @param arr array
 * @returns array
 */
const deepFlatten = <T>(arr: T[]) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

/**
 * @title unique
 * @description 数组去重
 * @param arr array
 * @returns array
 */
const unique = <T>(arr: T[]) => [...new Set(arr)];

/**
 * @title intersection
 * @description 获取数组交集
 * @param arrT []数组1
 * @param arrR []数组2
 * @returns []两数组同栈集合
 */
const intersection = <T extends any[], R extends any[]>(arrT: T, arrR: R) => {
  return arrT.filter((m) => arrR.includes(m));
};
/**
 * @title intersectionAll
 * @description 取多个数组的交集
 * @param ...arr [][]多个数组
 * @returns 数组交集
 */
const intersectionAll = (...args: any[]) =>
  args.reduce((acc, val) => intersection(val, acc));

/**
 * @title union
 * @description 多个元素的并集(去重)
 * @param ...arr [][]多个数组
 * @returns 数组并集
 */
const union = (...args: any[]) => unique(flatten(args, 1));

/**
 * @title difference
 * @description 两个数组的差集
 * @param arrT []数组1
 * @param arrR []数组2
 * @returns 数组差集
 */

const difference = <T extends any[], R extends any[]>(arrT: T, arrR: R) => {
  const allList = union(arrT, arrR);
  const intersectionList = intersection(arrT, arrR);
  return allList.filter((item) => !intersectionList.includes(item));
};

/**
 * @title differenceAll
 * @description 多个数组的差集
 * @param ...arr [][]多个数组
 * @returns 数组差集
 */
const differenceAll = (...args: any[]) =>
  args.reduce((acc, val) => difference(val, acc));

/**
 * @title array2Tree
 * @description 将单层级数组转化为树形结构
 * @description parentId为父元素的唯一标识，id为元素的唯一标识，默认为'id', pid为元素的父元素标识，默认为'pid'，children为要生成多层级子元素的字段名，默认为'children'
 * @param arr 扁平数组
 * @param parentId
 * @param options <{ id = "id", pid = "pid", children = "children" }>
 * @returns 树形数组
 */
const array2Tree = <T>(
  arr: T[],
  parentId = 0,
  { id = "id", pid = "pid", children = "children" } = {}
): T[] =>
  arr
    .filter((item) => item[pid] === parentId)
    .map((item) => ({
      ...item,
      [children]: array2Tree(arr, item[id], { id, pid, children }),
    }));

/**
 * @title tree2Array
 * @description 树状结构转为一维数组
 * @description id为每个元素的唯一标识，默认为'id'，children为多层级的子元素列表字段，默认为'children'
 * @param arr 扁平数组
 * @param parentId
 * @param options <{ id = "id", children = "children" }>
 * @returns 一维数组
 */
const tree2Array = <T>(
  tree: T[],
  { id = "id", children = "children" } = {}
): T[] => {
  const list = tree.reduce((acc: T[], item) => {
    if (Array.isArray(item[children]) && item[children].length) {
      return [...acc, item, ...tree2Array<T>(item[children], { id, children })];
    }
    return [...acc, item];
  }, [] as T[]);
  return list.map((item) => {
    return removeKeys(item, [children]) as T;
  });
};

/**
 * @title array2Object
 * @description 数组转为对象
 * @description 如果数组元素为对象时指定对象的某个唯一字段为 key 值，没有指定则默认为下标索引值
 * @param arr 数组
 * @param key
 * @returns object
 */
const array2Object = (arr: any[], key: string | number) => {
  if (!arr.length) {
    console.warn("传入数组为空");
    return null;
  }
  return arr.reduce((acc: AnyObj, val: AnyObj, index: number) => {
    acc[key && val[key] ? val[key] : index] = val;
    return acc;
  }, {});
};

/**
 * @title getTreeChains
 * @description  根据标识获取树状结构的数据链
 * @param id  number|string
 * @param tree  <{children:[]}>[]
 * @param options  <{ id: "id", pId: "pId", children: "children" }>
 * @returns array
 */
const getTreeChains = <T>(
  id: any,
  tree: T[],
  filter = ["id"],
  options = {}
) => {
  let opts = {
    id: "id",
    pId: "pId",
    children: "children",
  };
  opts = { ...opts, ...options };
  let list = tree2Array(tree, {
    id: opts.id,
    children: opts.children,
  }).reverse();
  let currentId = id;
  list = list.reduce((acc, item) => {
    if (currentId === item[opts.id]) {
      const chainItem = filter.reduce((subject, key) => {
        subject[key] = item[key];
        return subject;
      }, {} as T);
      acc.unshift(chainItem);
      currentId = item[opts.pId];
    }
    return acc;
  }, [] as T[]);
  if (filter.length === 1) {
    list = list.map((item) => item[filter[0]]);
  }
  return list;
};

/**
 * @title arrayLike2Array
 * @description 类数组转为数组
 * @param obj Iterable<T> | ArrayLike<T>
 * @returns T[]
 */
const arrayLike2Array = <T>(obj: Iterable<T> | ArrayLike<T>): T[] => {
  if (!isArrayLike(obj)) {
    console.warn("当前传入数据不是类数组");
    return [];
  }
  return Array.from(obj);
};

/**
 * @title chunk
 * @description 根据给定长度进行分组
 * @param arr T[]
 * @param size number
 * @returns T[][]
 */
const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (item, index) =>
    arr.slice(size * index, size * (index + 1))
  );

/**
 * @title compact
 * @description 过滤列表中的空数据
 * @param arr T[]
 * @returns T[]
 */
const compact = <T>(arr: T[]): T[] => arr.filter(Boolean);

/**
 * @title countBy
 * @description 根据条件获取元素的出现次数
 * @param arr T[]
 * @returns T[]
 */
const countBy = <T>(arr: T[], fn = (item: any) => item): AnyObj<number> =>
  arr
    .map((item) => (isFunction(fn) ? fn(item) : item))
    .reduce((acc, item) => {
      acc[item] = acc[item] ? ++acc[item] : 1;
      return acc;
    }, {});

/**
 * @title countByValue
 * @description 获取指定元素的出现次数
 * @param arr
 * @param val
 * @returns number
 */
const countByValue = <T>(arr: T[], val: string | number) => countBy(arr)[val];

/**
 * @title indexOfAll
 * @description 获取指定元素的下标值
 * @param arr
 * @param val
 * @returns number[]
 */
const indexOfAll = <T>(arr: T[], val: T) =>
  arr.reduce(
    (acc, item, index) => (item === val ? [...acc, index] : acc),
    [] as number[]
  );

/**
 * @title shuffe
 * @description 随机排序
 * @param arr
 * @returns number[]
 */
const shuffe = <T>(arr: T[]) => {
  const list = [...arr];
  let len = list.length;
  while (len) {
    const i = Math.floor(Math.random() * len--);
    [list[len], list[i]] = [list[i], list[len]];
  }
  return list;
};

/**
 * @title sample
 * @description 随机取数组中数据
 * @description size为取出元素的个数
 * @param arr any[]
 * @param size number
 * @returns any[]
 * @example sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) 结果=>[4, 6, 8]
 */
const sample = (arr: any[], size = 1) => {
  const list = shuffe(arr);
  return list.slice(0, size);
};

export {
  forEachType,
  forEach,
  forEachRight,
  isArrayLike,
  deepFlatten,
  unique,
  intersection,
  intersectionAll,
  union,
  difference,
  differenceAll,
  array2Tree,
  tree2Array,
  array2Object,
  getTreeChains,
  arrayLike2Array,
  chunk,
  compact,
  countBy,
  countByValue,
  indexOfAll,
  shuffe,
  sample,
};
