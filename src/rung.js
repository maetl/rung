import Random from "./random.js";
import * as algorithms from "./algorithms.js";

function seed(key=new Date().toString()) {
  const result = algorithms.murmix(key, 1);
  return result[0];
}

function seeds(key=new Date().toString(), count=1) {
  return algorithms.murmix(key, count);
}

function rung(_seed = Date.now()) {
  return new Random(algorithms.mersenneTwister(_seed));
}

export {
  Random,
  seed,
  seeds,
  algorithms
}

export default rung;
