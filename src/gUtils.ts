/**
 * @module gUtils
 * @type function tools
 * @description 一些好用的工具函数，不针对类型
 */

/**
 * @title nextTick
 * @param cb 即将执行的函数
 * @param ctx 传入cb的参数
 */

const callbacks: Function[] = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let microTimerFunc: Function;
const p = Promise.resolve();
microTimerFunc = () => {
  p.then(flushCallbacks);
};

function nextTick(cb: Function, ctx: any) {
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    }
  });
  if (!pending) {
    pending = true;
    microTimerFunc();
  }
}

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
