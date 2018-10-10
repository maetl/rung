import test from "ava";
import xorshift from "../../src/algorithms/xorshift";

test("seed produces repeatable state sequence", t => {
  const random1 = xorshift(11234546789);
  const random2 = xorshift(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});
