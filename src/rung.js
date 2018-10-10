import Random from "./random";
import mt from "./algorithms/mersenne-twister";

function rung(seed) {
  return new Random(mt(seed));
}

export default rung;
