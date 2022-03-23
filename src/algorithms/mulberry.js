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

export default mulberry;
