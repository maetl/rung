function murmix(key, seeds=1) {
  let h = 1779033703 ^ key.length;

  for(let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 3432918353),
    h = h << 13 | h >>> 19;
  }

  const result = [];

  for (let s=0; s < seeds; s++) {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    result[s] = (h ^= h >>> 16) >>> 0;
  }

  return result;
}

export default murmix;
