/**
 * @module GMap
 * @type class
 * @extends Map
 */
export default class GMap<K, V> extends Map<K, V> {
  /**
   * @title array
   * @param map
   * @returns
   */
  static array<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k, v]) => ({ key: k, value: v }));
  }
  /**
   * @title getKeys
   * @param map
   * @returns
   */
  static getKeys<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k]) => k);
  }
  /**
   * @title getKeys
   * @returns
   */
  getKeys() {
    return Array.from(this, ([k]) => k);
  }
  /**
   * @title getValues
   * @returns
   */
  getValues() {
    return Array.from(this, ([, v]) => v);
  }
  /**
   * @title getEntrues
   * @returns
   */
  getEntries() {
    return Array.from(this);
  }
  /**
   * @title map
   * @param fn
   * @returns
   */
  map<R>(fn: (v: V, k: K, i: number) => R): R[] {
    return Array.from(this, ([k, v], i) => fn(v, k, i));
  }
  /**
   * @title filter
   * @param fn
   * @returns
   */
  filter(fn: (m: V) => boolean) {
    const arr: V[] = [];
    this.forEach((m) => {
      if (fn(m)) arr.push(m);
    });
    return arr;
  }
}
