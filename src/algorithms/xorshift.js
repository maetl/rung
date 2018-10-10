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

export default xorshift;
