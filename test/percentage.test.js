import test from "ava";
import fixed from "../src/algorithms/fixed";
import Random from "../src/rung";

test("percentage as integer", t => {
  const rng = new Random(fixed());
  t.is(rng.percentage(), 48);
});

test("percentage with decimal precision", t => {
  const rng = new Random(fixed());
  t.is(rng.percentage(1), 47.7);
  t.is(rng.percentage(2), 47.70);
  t.is(rng.percentage(3), 47.708);
  t.is(rng.percentage(14), 47.70875762153106);
  t.is(rng.percentage(16), 47.7087576215310600);
});
