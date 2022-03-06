import test from "ava";
import mt from "../../src/algorithms/mersenne-twister.js";

test("seed produces repeatable state sequence", t => {
  const random1 = mt(11234546789);
  const random2 = mt(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});
