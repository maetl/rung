import test from "ava";
import alea from "../../src/algorithms/alea.js";

test("seed produces repeatable state sequence", t => {
  const random1 = alea(11234546789);
  const random2 = alea(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});
