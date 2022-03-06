import test from "ava";
import fixed from "../../src/algorithms/fixed.js";

test("fixed constant for testing", t => {
  const random = fixed();

  t.is(random(), 0.4770875762153106)
  t.is(random(), 0.4770875762153106)
});
