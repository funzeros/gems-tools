/**
 * @module gUtils
 * @type function tools
 * @description 一些好用的工具函数，不针对类型
 */

/**
 * @title gNextTick
 * @description 基于setTimeout的微任务入列
 * @param cb 即将执行的函数
 * @param arg 传入cb的参数
 */
const gNextTick = (cb: Function, ...arg: any[]) => {
  setTimeout(() => {
    cb(...arg);
  }, 0);
};

export { gNextTick };
const gUtils = {
  gNextTick,
};

export default gUtils;
