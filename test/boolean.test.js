import test from "ava";
import native from "../src/algorithms/native.js";
import Random from "../src/random.js";

function round3Dp(number) {
  return +(Math.round(number + "e+" + 3)  + "e-" + 3);
}

test("long run odds", t => {
  const rng = new Random(native());

  let isTrue = 0;
  let isFalse = 0;

  for (let i=0; i<2000; i++) {
    if (rng.boolean()) {
      isTrue++;
    } else {
      isFalse++;
    }
  }

  const diff = round3Dp(Math.abs(1 - (isTrue / isFalse)));
  t.true(diff < 0.1);
});
