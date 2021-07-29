export default class GMap<K, V> extends Map<K, V> {
  static array<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k, v]) => ({ key: k, value: v }));
  }
  static getKeys<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k]) => k);
  }
  getKeys() {
    return Array.from(this, ([k]) => k);
  }
  getValues() {
    return Array.from(this, ([, v]) => v);
  }
  getEntries() {
    return Array.from(this);
  }
  map<R>(fn: (v: V, k: K, i: number) => R): R[] {
    return Array.from(this, ([k, v], i) => fn(v, k, i));
  }
  filter(fn: (m: V) => boolean) {
    const arr: V[] = [];
    this.forEach((m) => {
      if (fn(m)) arr.push(m);
    });
    return arr;
  }
}
