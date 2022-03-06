import Random from "./random.js";
import seed from "./seed.js";
import mt from "./algorithms/mersenne-twister.js";

function rung(seed = Date.now()) {
  return new Random(mt(seed));
}

rung.Random = Random;
rung.seed = seed;

export default rung;
