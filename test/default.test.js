import test from "ava";
import rung from "../src/rung";

test("initialize default rng with a seed", t => {
  const rng = rung(12345);
  t.is(rng.number(), 0.9296160866506398);
  t.is(rng.number(), 0.8901547130662948);
});
