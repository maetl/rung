import test from "ava";
import fixed from "../src/algorithms/fixed.js";
import Random from "../src/random.js";

test("angle in radians", t => {
  const rng = new Random(fixed());
  t.is(rng.angle(), 2.9976296491139607);
});
