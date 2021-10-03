/**
 * @module GMap
 * @type class
 * @extends Map
 */
export class GMap<K, V> extends Map<K, V> {
  /**
   * @title array
   * @description 静态方法
   * @param map 接收GMap或者Map类型
   * @returns {key,value}[]
   */
  static array<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k, v]) => ({ key: k, value: v }));
  }
  /**
   * @title getKeys
   * @description 静态方法
   * @param map 接收GMap或者Map类型
   * @returns key[]
   */
  static getKeys<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k]) => k);
  }
  /**
   * @title getKeys
   * @returns key[]
   */
  getKeys() {
    return Array.from(this, ([k]) => k);
  }
  /**
   * @title getValues
   * @returns value[]
   */
  getValues() {
    return Array.from(this, ([, v]) => v);
  }
  /**
   * @title getEntrues
   * @returns <[key,value]>[]
   */
  getEntries() {
    return Array.from(this);
  }
  /**
   * @title map
   * @param callback (value,key,index)=>T
   * @returns T[]
   */
  map<R>(fn: (v: V, k: K, i: number) => R): R[] {
    return Array.from(this, ([k, v], i) => fn(v, k, i));
  }
  /**
   * @title filter
   * @param callback (value,key,index)=>boolean
   * @returns value[]
   */
  filter(fn: (v: V, k: K, i: number) => boolean) {
    const arr: V[] = [];
    Array.from(this, ([k, v], i) => {
      if (fn(v, k, i)) arr.push(v);
    });
    return arr;
  }
}
