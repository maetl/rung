import test from "ava";
import { seed, seeds } from "../src/rung.js";

test("returns number by default", t => {
  const seed1 = seed();

  t.true(Number.isInteger(seed1));
  t.true(0 < seed1 && seed1 < Number.MAX_VALUE);
});

test("returns consistent value with given key", t => {
  const seed1 = seed("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  t.is(seed1, 4178526661);
});

test("returns sequence of results with given count", t => {
  const [seed1, seed2, seed3, seed4] = seeds("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

  t.is(seed1, 4178526661);
  t.is(seed2, 2754842588);
  t.is(seed3, 2154930411);
  t.is(seed4, 2232389028);
});
