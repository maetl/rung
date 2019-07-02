import Random from "./random";
import seed from "./seed";
import mt from "./algorithms/mersenne-twister";

function rung(seed = Date.now()) {
  return new Random(mt(seed));
}

rung.Random = Random;
rung.seed = seed;

export default rung;
