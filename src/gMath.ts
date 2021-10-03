/**
 * @module GMath
 * @type class
 * @description 注意！该类下的方法皆为静态方法
 */
export class GMath {
  /**
   * @title randomLenNum
   * @description 随机长度数字
   * @param length
   * @param isNumber
   * @returns string|number
   */
  static randomLenNum(length = 4, isNumber = true) {
    const str = (Math.random() * Math.pow(10, length)).toFixed(0);
    if (isNumber) return Number(str);
    else return new Array(length - str.length).fill("0").join("") + str;
  }
  /**
   * @title randomStr
   * @description 随机字符串
   * @returns string
   */
  static randomStr() {
    return Math.random().toString(36).slice(-8);
  }
  /**
   * @title randomBoolean
   * @description 随机布尔值
   * @param float
   * @returns boolean
   */
  static randomBoolean(float = 0.5) {
    return Math.random() < float;
  }
  /**
   * @title randomRange
   * @description 随机数字范围
   * @param min
   * @param max
   * @param float
   * @returns number
   */
  static randomRange(min: number, max: number, float = 0) {
    return this.precision(Math.random() * (max - min) + min, float);
  }
  /**
   * @title randomArray
   * @description 随机返回数组中的一项
   * @param arr T[]
   * @returns T
   */
  static randomArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /**
   * @title randomLength
   * @description 随机长度范围内的整值（多适用于随机取数组索引）
   * @param length
   * @returns number
   */
  static randomLength(length: number) {
    return Math.floor(Math.random() * length);
  }
  /**
   * @title precision
   * @description 精度控制
   * @param num 浮点数
   * @param precision 精度 默认=2 保留2位小数
   * @returns number
   */
  static precision(num: number, precision = 2) {
    const dig = Math.pow(10, precision);
    const number = Number(num);
    if (isNaN(number)) return 0;
    return Math.round(number * dig) / dig;
  }
  /**
   * @title between
   * @description 判断两数或日期之间
   * @param source  T 判断目标 可以是number|string|Date
   * @param target  T[]判断范围
   * @param border 是否含边界 默认false 含左侧
   * @returns boolean
   */
  static between(
    source: number | string | Date,
    target: (number | string | Date)[],
    border = false
  ) {
    const num =
      typeof source === "number" ? source : new Date(source).valueOf();
    const arr = target
      .map((m) => {
        return typeof m === "number" ? m : new Date(m).valueOf();
      })
      .sort();
    if (border) return num >= arr[0] && num <= arr[1];
    else return num >= arr[0] && num < arr[1];
  }
}
