function xor128(seed) {
  let state0 = seed;
  let state1 = 1;

  function next() {
    let s1 = state0;
    let s0 = state1;

    state0 = s0;

    s1 ^= s1 << 23; // 23
    s1 ^= s1 >> 17; // 18
    s1 ^= s0;
    s1 ^= s0 >> 26; // 5

    state1 = s1;

    return ((state0 + state1) >>> 0) / ((1 << 30) * 4);
  }

  return next;
}

export default xor128;
