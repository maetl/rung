'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

const POW_2_N_32 = Math.pow(2, -32);

function alea(seed) {
  let s = seed;
  let s0 = (s >>> 0) * POW_2_N_32;
  let s1 = (s = (s * 69069 + 1 ) >>> 0) * POW_2_N_32;
  let s2 = (s = (s * 69069 + 1 ) >>> 0) * POW_2_N_32;
  let c = 1;

  return function next() {
    let t = 2091639 * s0 + c * POW_2_N_32;
    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  }
}

const F_MT19937 = 1812433253;
const N_DEGREE = 624;
const M_OFFSET = 397;
const N_DIFF = M_OFFSET - N_DEGREE;
const M_DIFF = N_DEGREE - M_OFFSET;
const MATRIX_A = 0x9908b0df;
const UPPER_MASK = 0x80000000;
const LOWER_MASK = 0x7fffffff;
const TEMPERING_MASK_A = 0x9d2c5680;
const TEMPERING_MASK_B = 0xefc60000;

function mersenneTwister(seed) {
  const state = new Array(N_DEGREE);
  let index, s, lhs, rhs;

  state[0] = seed >>> 0;

  for (index = 1; index < N_DEGREE; index++) {
    s = state[index-1] ^ (state[index-1] >>> 30);
    lhs = (((s & 0xffff0000) >>> 16) * F_MT19937) << 16;
    rhs = (s & 0x0000ffff) * F_MT19937;
    state[index] = lhs + rhs + index;
    state[index] >>>= 0;
  }

  return function next() {
    let y;
    const mag01 = new Array(0x0, MATRIX_A);

    if (index >= N_DEGREE) {
      let kk;

      for (kk = 0; kk < M_DIFF; kk++) {
        y = (state[kk] & UPPER_MASK) | (state[kk+1] & LOWER_MASK);
        state[kk] = state[kk + M_OFFSET] ^ (y >>> 1) ^ mag01[y & 0x1];
      }

      while (kk < N_DEGREE-1) {
        y = (state[kk] & UPPER_MASK) | (state[kk+1] & LOWER_MASK);
        state[kk] = state[kk + N_DIFF] ^ (y >>> 1) ^ mag01[y & 0x1];
        kk++;
      }

      y = (state[N_DEGREE-1] & UPPER_MASK) | (state[0] & LOWER_MASK);
      state[N_DEGREE-1] = state[M_OFFSET-1] ^ (y >>> 1) ^ mag01[y & 0x1];
      index = 0;
    }

    y = state[index++];
    y ^= (y >>> 11);
    y ^= (y << 7) & TEMPERING_MASK_A;
    y ^= (y << 15) & TEMPERING_MASK_B;
    y ^= (y >>> 18);

    return (y >>> 0) / ((1 << 30) * 4);
  }
}

function xorshift(seed) {
  let x = seed * 0xFFFFFFFFF;
  let y = 362436069;
  let z = 521288629;
  let w = 88675123;

  return function next() {
    let t = x ^ (x << 11);
    x = y;
    y = z;
    z = w;
    w ^= (w >> 19) ^ t ^ (t >> 8);
    return (w * z >>> 0) / ((1 << 30) * 4);
  }
}

function murmix(key, seeds=1) {
  let h = 1779033703 ^ key.length;

  for(let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 3432918353),
    h = h << 13 | h >>> 19;
  }

  const result = [];

  for (let s=0; s < seeds; s++) {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    result[s] = (h ^= h >>> 16) >>> 0;
  }

  return result;
}

function native() {
  return Math.random;
}

const A_MUL = 1831565813;
const M_32_LIMIT = Math.pow(2, 32);

function mulberry(seed) {
  let a = seed;
  let t;

  return function next() {
    a |= 0; a = a + A_MUL | 0;
    t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / M_32_LIMIT;
  }
}

var algorithms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  alea: alea,
  mersenneTwister: mersenneTwister,
  xorshift: xorshift,
  murmix: murmix,
  native: native,
  mulberry: mulberry
});

function seed(key=new Date().toString()) {
  const result = murmix(key, 1);
  return result[0];
}

function seeds(key=new Date().toString(), count=1) {
  return murmix(key, count);
}

function rung(_seed = Date.now()) {
  return new Random(mersenneTwister(_seed));
}

var version = "0.9.2";

exports.Random = Random;
exports.algorithms = algorithms;
exports.rung = rung;
exports.seed = seed;
exports.seeds = seeds;
exports.version = version;
