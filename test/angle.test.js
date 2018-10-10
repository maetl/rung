import test from "ava";
import fixed from "../src/algorithms/fixed";
import Random from "../src/rung";

test("angle in radians", t => {
  const rng = new Random(fixed());
  t.is(rng.angle(), 2.9976296491139607);
});
