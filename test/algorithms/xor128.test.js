import test from "ava";
import xor128plus from "../../src/algorithms/xor128plus";

test("seed produces repeatable state sequence", t => {
  const random1 = xor128plus(11234546789);
  const random2 = xor128plus(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});
