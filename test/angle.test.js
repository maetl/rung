import test from "ava";
import Rung from "../src/rung";

test("angle in radians", t => {
  const rng = new Rung();
  t.is(rng.angle(), 2.9976296491139607);
});
