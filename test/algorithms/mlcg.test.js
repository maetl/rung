import test from "ava";
import mlcg from "../../src/algorithms/mlcg.js";

test("seed produces repeatable state sequence", t => {
  const random1 = mlcg(11234546789);
  const random2 = mlcg(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});
