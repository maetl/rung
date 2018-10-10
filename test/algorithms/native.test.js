import test from "ava";
import native from "../../src/algorithms/native";

test("native generator is not seedable", t => {
  const random1 = native();
  const random2 = native();

  for (let i=0; i<1000; i++) {
    t.not(random1(), random2());
  }
});
