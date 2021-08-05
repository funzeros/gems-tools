/**
 * @module gUtils
 * @type function tools
 * @description 一些好用的工具函数，不针对类型
 */

/**
 * @title nextTick
 * @description 基于setTimeout的微任务入列
 * @param cb 即将执行的函数
 * @param arg 传入cb的参数
 */
const nextTick = (cb: Function, ...arg: any[]) => {
  Promise.resolve().then(() => {
    cb(...arg);
  });
  return nextTick;
};

/**
 * @title copy
 * @description 复制到剪贴板
 * @param string
 */
const copy = (string: string) => {
  const el = document.createElement("input") as HTMLInputElement;
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export { nextTick, copy };
const gUtils = {
  nextTick,
  copy,
};

export default gUtils;
