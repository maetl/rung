import test from "ava";
import murmix from "../../src/algorithms/murmix.js";

test("hash function returns consistent result for given key", t => {
  const [seed] = murmix("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  t.true(Number.isInteger(seed));
  t.is(seed, 4178526661);
});
