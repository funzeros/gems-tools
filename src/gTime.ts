/**
 * @module GTime
 * @type class
 * @description 一些时间和日期方法
 */
class GTime {
  /**
   * @title formatZero
   * @description 静态方法，补零
   * @param num
   * @param len 2
   * @returns string
   */
  static formatZero = (num: number, len = 2) => {
    const str = `${num}`;
    if (str.length < len) {
      return (new Array(len).join("0") + str).substring(str.length - 1);
    }
    return str;
  };
  /**
   * @title getDigitTime
   * @description 静态方法 获取时分秒，
   * @param time 默认当前时间
   * @returns xx:xx:xx
   */
  static getDigitTime(time = Date.now()) {
    const now = new Date(time);
    return `${this.formatZero(now.getHours(), 2)}:${this.formatZero(
      now.getMinutes(),
      2
    )}:${this.formatZero(now.getSeconds(), 2)}`;
  }
}

export default GTime;
