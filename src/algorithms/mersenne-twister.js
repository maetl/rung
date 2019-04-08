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

export default mersenneTwister;
