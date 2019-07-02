import murmix from "./algorithms/murmix";

function seed(key=new Date().toString(), seeds=1) {
  const result = murmix(key, seeds);
  return seeds == 1 ? result[0] : result;
}

export default seed;
