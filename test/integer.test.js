import test from "ava";
import fixed from "../src/algorithms/fixed";
import Random from "../src/rung";

test("integer with min inclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.integer(1), 0);
});

test("integer with max exclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.integer(0, 1), 0);
});

test("integer within max range", t => {
  const rng = new Random(fixed());
  t.is(rng.integer(6), 2);
});

test("integer within min and max range", t => {
  const rng = new Random(fixed());
  t.is(rng.integer(10, 20), 14);
});
