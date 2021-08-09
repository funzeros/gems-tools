import { removeKeys } from "./gObj";
/**
 * @module GStorage
 * @type class
 * @extends Map
 */

const Store: Storage = window.localStorage;
const storeMap = new Map<string, GStorage>(); // 存储不同模块本地存储信息列表

/**
 * @title useGStore
 * @description 直接使用，传入命名空间，会查找或创建并返回对应实例
 * @param namespaced string
 * @returns GStorage
 */
function useGStore(namespaced = "g_store") {
  if (!storeMap.has(namespaced))
    storeMap.set(namespaced, new GStorage(namespaced));
  return storeMap.get(namespaced);
}

class GStorage {
  namespaced: string;
  state: object = {};
  constructor(namespaced: string) {
    this.namespaced = namespaced;
    this.state = {}; // 本地存储JSON格式数据
    this.init();
  }
  /**
   * @title init
   * @description 实例方法 初始化 自动调用
   */
  init() {
    try {
      const data = Store.getItem(this.namespaced);
      if (data) {
        this.state = JSON.parse(data);
      }
      this.saveState();
    } catch (err) {
      this.state = {};
      this.saveState();
    }
  }
  /**
   * @title saveState
   * @description 实例方法 保存当前命名空间本地存储信息 自动调用
   */
  saveState() {
    Store.setItem(this.namespaced, JSON.stringify(this.state));
  }
  /**
   * @title setItem
   * @description 存储字段名对应的内容信息
   * @param key
   * @param data
   * @returns state 整个store对象
   */
  setItem(key: string | number, data: any) {
    this.state[key] = data;
    this.saveState();
    return this.state;
  }
  /**
   * @title getItem
   * @description 获取字段名对应的内容信息
   * @param key
   * @returns value store中key对应的值
   */
  getItem(key: string | number) {
    return this.state[key];
  }
  /**
   * @title removeItem
   * @description 删除字段名对应的内容信息
   * @param key
   * @returns state 整个store对象
   */
  removeItem(key: any) {
    this.state = removeKeys(this.state, [key]);
    this.setState();
    return this.state;
  }
  setState() {
    throw new Error("Method not implemented.");
  }
  /**
   * @title clear
   * @description 清除当前命名空间
   */
  clear() {
    this.state = {};
    Store.removeItem(this.namespaced);
  }
}

export { useGStore };
export default GStorage;
