import test from "ava";
import fixed from "../src/algorithms/fixed";
import Random from "../src/rung";

const FIXED = 0.4770875762153106;

test("fixed number", t => {
  const rng = new Random(fixed());
  t.is(rng.number(1), FIXED);
});

test("number with min inclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.number(Number.MIN_VALUE), 0);
});

test("number with max exclusive", t => {
  const rng = new Random(fixed());
  t.is(rng.number(0, Number.MIN_VALUE), 0);
});

test("number within max range", t => {
  const rng = new Random(fixed());
  t.is(rng.number(6), 2.8625254572918637);
});

test("number within min and max range", t => {
  const rng = new Random(fixed());
  t.is(rng.number(10.0, 20.0), 14.770875762153107);
});
