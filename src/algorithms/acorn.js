const MODULUS = Math.pow(2, 51);
const ORDER_K = 11;

function acorn(seed) {
  let stateY1 = seed;
  let stateY2 = seed;

  return function next() {
    let previous = stateY1;
    let current = stateY2;

    for (let i=0; i <= ORDER_K; i++) {
      let result = (previous + current) % MODULUS;

      if (i % 2 == 0) {
        stateY2 = previous;
        current = stateY1;
      } else {
        stateY1 = previous;
      }

      previous = result;
    }

    return (((ORDER_K % 2) == 0) ? stateY1 : stateY2) / MODULUS;
  }
}

export default acorn;