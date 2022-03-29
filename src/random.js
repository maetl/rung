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
   *
   * @return {number}
   */
   number() {
     return this.next();
   }

  /**
   * Returns an approximately uniform decimal number within the given range.
   *
   * @param {number} min Minimum value of numeric range (inclusive)
   * @param {number} max Maximum value of numeric range (exclusive)
   * @return {number}
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
   * @return {number}
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
   *
   * @return {boolean}
   */
  boolean() {
    return this.next() > 0.5;
  }

  /**
   * Has a likelihood of returning true approximately equal to the given odds.
   *
   * For best results, the given odds must be between 0 and 1. Any ratio <= 0
   * will always return false and any ratio >= 1 will always return true.
   *
   * @example
   * // A one in ten chance
   * random.chance(0.1)
   *
   * // A three in four chance
   * random.chance(0.75)
   *
   * @example <caption>Use the division operator to express fractions.</caption>
   * // A one in three chance
   * random.chance(1 / 3)
   *
   * // A nine in ten chance
   * random.chance(9 / 10)
   *
   * @param  {number} odds Odds of returning true as a decimal ratio
   * @return {boolean}
   */
  chance(odds) {
    return this.next() < odds;
  }

  /**
   * @deprecated The method is deprecated as it hasn’t proven useful and the
   *             behaviour is already covered by `integer` and `decimal`.
   */
  percentage(precision) {
    if (precision == undefined) {
      return this.integer(100);
    } else {
      const number = this.decimal(100 + Number.MIN_VALUE);
      const decimalPattern = '^\\d+(?:\.\\d{0,' + precision + '})?';
      return parseFloat(number.toString().match(decimalPattern)[0]);
    }
  }

  /**
   * Get a random angle in radians.
   *
   * @return {number}
   */
  angle() {
    return this.decimal(0, Math.PI * 2 + Number.MIN_VALUE);
  }
}

export default Random;
