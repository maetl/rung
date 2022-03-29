import test from "ava";
import fixed from "../src/algorithms/fixed.js";
import Random from "../src/random.js";

const FIXED = 0.4770875762153106;

test("fixed number", t => {
  const rng = new Random(fixed());
  t.is(rng.decimal(1), FIXED);
});

test("number with min inclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.decimal(Number.MIN_VALUE), 0);
});

test("number with max exclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.decimal(0, Number.MIN_VALUE), 0);
});

test("number within max range", t => {
  const rng = new Random(fixed());
  t.is(rng.decimal(6), 2.8625254572918637);
});

test("number within min and max range", t => {
  const rng = new Random(fixed());
  t.is(rng.decimal(10.0, 20.0), 14.770875762153107);
});

// test("percentage as integer", t => {
//   const rng = new Random(fixed());
//   t.is(rng.percentage(), 48);
// });
//
// test("percentage with decimal precision", t => {
//   const rng = new Random(fixed());
//   t.is(rng.percentage(1), 47.7);
//   t.is(rng.percentage(2), 47.70);
//   t.is(rng.percentage(3), 47.708);
//   t.is(rng.percentage(14), 47.70875762153106);
//   t.is(rng.percentage(16), 47.7087576215310600);
// });
