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

export default alea;
