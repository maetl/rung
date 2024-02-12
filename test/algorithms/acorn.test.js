import test from "ava";
import acorn from "../../src/algorithms/acorn.js";

test("seed produces repeatable state sequence", t => {
  const random1 = acorn(11234546789);
  const random2 = acorn(11234546789);

  for (let i=0; i<1000; i++) {
    t.is(random1(), random2());
  }
});

test("long random sequence of state to test", t => {
  const random1 = acorn(11234546789);
  const seq = []; 

  for (let i=0; i<1000; i++) {
    seq[i] = random1();
  }

  const average = seq.reduce((r, z) => r + z) / 1000;

  t.true(average > 0.48);
  t.true(average < 0.52);
});
