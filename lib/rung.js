// Rung 0.0.1
//
// (c) 2015 Mark Rickerby, Editorial Technology
//
// Rung may be freely distributed under the MIT license.
//
(function (root, factory) {
  // Set up exports for Node.js or CommonJS.
  if (typeof exports === 'object') {
      module.exports = factory();
  // Or fall through to AMD Definition.
  } else if (typeof define === 'function' && define.amd) {
      define(factory);
  // Or attach as a browser global.
  } else {
      root.Rung = factory();
  }
}(this, function () {

  var Rung = {

    seed: function() {
      return new Date().getTime();
    },

    number: function() {
      return new this.Value().number();
    },

    percent: function() {
      return new this.Value().percent();
    },

    integer: function(minOrMax, max) {
      return new this.Value().integer(minOrMax, max);
    },

    Value: function(seed) {
      if (seed == undefined) {
        seed = this.seed;
      }

      if (typeof seed == 'function') {
        seed = seed();
      }

      // TODO: pluggable generator
      this.generator = new MersenneTwister(seed);
    },

    Coin: {
      HEADS: 'heads',
      TAILS: 'tails',
      flip: function() {
        return (new Rung.Value().boolean()) ? Rung.Coin.HEADS : Rung.Coin.TAILS;
      }
    },

    Dice: function(multiplier) {

      if (multiplier == undefined) {
        multiplier = 1;
      }

      return {
        d6: function() {
          return new Rung.Value().integer(1,7) * multiplier;
        }
      }
    }

  }

  Rung.Value.prototype.number = function() {
    return this.generator.random();
  }

  Rung.Value.prototype.percent = function() {
    return 1 + Math.floor(this.generator.random() * 100);
  }

  Rung.Value.prototype.integer = function(minOrMax, max) {
    if (max == undefined) {
      var min = 0;
      var max = minOrMax;
    } else {
      var min = minOrMax;
    }

    return Math.floor(this.generator.random() * (max - min) + min);
  }

  Rung.Value.prototype.boolean = function() {
    return this.generator.random() > 0.5 ? true : false;
  }

  var MersenneTwister = function(seed) {
    /* Period parameters */  
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;   /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
   
    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */
   
    this.init_genrand(seed);
  }  
   
  /* initializes mt[N] with a seed */
  MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti=1; this.mti<this.N; this.mti++) {
        var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
     this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
    + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
  }
   
  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i=1; j=0;
    k = (this.N>key_length ? this.N : key_length);
    for (; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
        + init_key[j] + j; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++; j++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
      if (j>=key_length) j=0;
    }
    for (k=this.N-1; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
        - i; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    }
   
    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
  }
   
  /* generates a random number on [0,0xffffffff]-interval */
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */
   
    if (this.mti >= this.N) { /* generate N words at one time */
      var kk;
   
      if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
        this.init_genrand(5489); /* a default initial seed is used */
   
      for (kk=0;kk<this.N-this.M;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (;kk<this.N-1;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
      this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];
   
      this.mti = 0;
    }
   
    y = this.mt[this.mti++];
   
    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
   
    return y >>> 0;
  }
   
  /* generates a random number on [0,0x7fffffff]-interval */
  MersenneTwister.prototype.genrand_int31 = function() {
    return (this.genrand_int32()>>>1);
  }
   
  /* generates a random number on [0,1]-real-interval */
  MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32()*(1.0/4294967295.0); 
    /* divided by 2^32-1 */ 
  }
   
  /* generates a random number on [0,1)-real-interval */
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32()*(1.0/4294967296.0); 
    /* divided by 2^32 */
  }
   
  /* generates a random number on (0,1)-real-interval */
  MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); 
    /* divided by 2^32 */
  }
   
  /* generates a random number on [0,1) with 53-bit resolution*/
  MersenneTwister.prototype.genrand_res53 = function() { 
    var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
    return(a*67108864.0+b)*(1.0/9007199254740992.0); 
  }

  Rung.Random = {
    MersenneTwister: MersenneTwister
  }

  return Rung;

}));
