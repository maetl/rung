import test from "ava";
import fixed from "../src/algorithms/fixed.js";
import native from "../src/algorithms/native.js";
import Random from "../src/random.js";

test("fixed likelihood", t => {
  const rng = new Random(fixed());
  t.is(rng.chance(1 / 3), false);
  t.is(rng.chance(2 / 3), true);
  t.is(rng.chance(9 / 10), true);
});

test("zero or less is always false", t => {
  const rng = new Random(native());
  t.is(rng.chance(0), false);
  t.is(rng.chance(-1), false);
  t.is(rng.chance(-0.1), false);
});

test("one or more is always true", t => {
  const rng = new Random(native());
  t.is(rng.chance(1), true);
  t.is(rng.chance(2), true);
  t.is(rng.chance(1.1), true);
});
