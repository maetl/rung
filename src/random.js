class Random {
  /**
   * Create a new instance using the supplied sequence function.
   * @param {fn:} generator  [description]
   */
  constructor(next) {
    this.next = next;
  }

  /**
   * Returns an approximately uniform number within the half-open interval [0..1).
   */
   number() {
     return this.next();
   }

  /**
   * Returns an approximately uniform decimal number within the given range.
   *
   * @param {number} min Minimum value of numeric range (inclusive)
   * @param {number} max Maximum value of numeric range (exclusive)
   */
  decimal(min, max) {
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
    return Math.floor(this.next() * (max - min + 1) + min);
  }

  /**
   * A boolean coin toss.
   */
  boolean() {
    return this.next() >= 0.5 ? true : false;
  }

  percentage(precision) {
    if (precision == undefined) {
      return this.integer(100);
    } else {
      const number = this.decimal(100 + Number.MIN_VALUE);
      const decimalPattern = '^\\d+(?:\.\\d{0,' + precision + '})?';
      return parseFloat(number.toString().match(decimalPattern)[0]);
    }
  }

  angle() {
    return this.decimal(0, Math.PI * 2 + Number.MIN_VALUE);
  }
}

export default Random;
