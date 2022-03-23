const M_32_MAX = Math.pow(2, 31);
const M_32_LIMIT = M_32_MAX - 1;
const A_MUL = 48271;

function mlcg(seed) {
  let state = seed;

  next();

  function next() {
    state = Math.imul(A_MUL, state) | 0 % M_32_LIMIT;
    return (state & M_32_LIMIT) / M_32_MAX;
  }

  return next;
}

export default mlcg;
