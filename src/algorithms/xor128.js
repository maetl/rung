function xor128(seed) {
  let x = seed;
  let y = 0;
  let z = 0;
  let w = 0;

  function next() {
    let t = x ^ (x << 11);
    x = y;
    y = z;
    z = w;
    w ^= (w >> 19) ^ t ^ (t >> 8);

    return (w >>> 0) / ((1 << 30) * 4);
  }

  return next;
}

export default xor128;
