/**
 *
 */
class Random {
  constructor(generator) {
    this.next = generator;
  }

  /**
   * Returns a random number within the given range.
   *
   * @param {number} min Minimum value of numeric range (inclusive)
   * @param {number} max Maximum value of numeric range (inclusive)
   */
  number(min, max) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return this.next() * (max - min) + min;
  }

  /**
   * Returns a random integer within the given range.
   *
   * @param {number} min Minimum value of integer range (inclusive)
   * @param {number} max Maximum value of integer range (inclusive)
   */
  integer(min, max) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(this.next() * (max - min) + min);
  }

  /**
   * A boolean coin toss.
   */
  boolean() {
    return this.next() >= 0.5 ? true : false;
  }

  percentage(precision) {
    if (precision == undefined) {
      return this.integer(101);
    } else {
      const number = this.number(100 + Number.MIN_VALUE);
      const decimalPattern = '^\\d+(?:\.\\d{0,' + precision + '})?';
      return parseFloat(number.toString().match(decimalPattern)[0]);
    }
  }

  angle() {
    return this.number(0, Math.PI * 2 + Number.MIN_VALUE);
  }
}

export default Random;
