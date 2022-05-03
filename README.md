# Rung

A randomness toolkit for browser-based game development, simulations and generative methods.

## Status

[![npm](https://img.shields.io/npm/v/rung.svg)](https://npmjs.org/package/rung)
[![github](https://img.shields.io/github/workflow/status/maetl/rung/Node.js%20CI)](https://github.com/maetl/rung/actions)

## Overview

For historical reasons, `Math.random`—JavaScript’s native function for generating pseudorandom numbers—doesn’t support seeding, which limits its usefulness in contexts where it is essential to have sequences of random values be reproducible for testing, balancing and restoring state.

Additionally, `Math.random` only provides values on the half-open interval [0..1), while many models and mechanics work with values as integers, often clamped between upper and lower bounds.

Rung exists to bridge this gap. It provides a small suite of 32 bit seedable pseudorandom number generators wrapped with an integer-focused API, suitable for use in browser-based game development, simulations and generative methods.

## Install

```
npm install rung
```

## Importing

The library is set up for importing via ES modules by default.

### ESM

```js
// main initializer
import rung from "rung"

// seed mixing functions
import { seed, seeds } from "rung"

// Random class
import Random from "rung/random"

// Various PRNG algorithms
import mersenneTwister from "rung/algorithms/mersenne-twister"
import alea from "rung/algorithms/alea"
import mulberry from "rung/algorithms/mulberry"
```

### CommonJS

An alternative CommonJS bundle is also provided for use in NodeJS contexts where `type: module` can not be used.

```js
// main initializer
const { rung } = require("rung")

// seed mixing functions
const { seed, seeds } = require("rung")

// Random class
const { Random } = require("rung")

// Various PRNG algorithms
const { algorithms } = require("rung")
```

### Vendor Bundle

If you want to manually copy a vendor bundle into your browser app or link to it without using NPM, ESM or CommonJS, get the source from the minified IIFE bundle [rung.min.js on Unpkg](https://unpkg.com/rung/dist/rung.min.js) or [rung.min.js on jsDelivr](https://cdn.jsdelivr.net/npm/rung/dist/rung.min.js).

## Usage

### Constructing Instances

Get a seeded instance of the default random number generator (Mersenne Twister):

```js
import rung from "rung"

const rng = rung(524287)
```

Configure with a specific PRNG algorithm:

```js
import Random from "rung/random"
import alea from "rung/algorithms/alea"

const rng = new Random(alea(524287))
```

Generate a seed value from a given string:

```js
import rung, { seed } from "rung"

const rng = rung(seed("abcdefghijklmnopqrstuvwxyz"))
```

## Random API

Get an integer between 0 and 10 (inclusive):

```js
rng.integer(10)
```

Get an integer between 10 and 20 (inclusive):

```js
rng.integer(10, 20)
```

Get a real number as a decimal between 0 and 20 (inclusive):

```js
rng.decimal(20.0)
```

Get a real number as a decimal between 10 and 20 (inclusive):

```js
rng.decimal(10.0, 20.0)
```

Get the result of a boolean coin toss (`true` or `false`):

```js
rng.boolean()
```

Get a chance of being true from the given likelihood:

```js
rng.chance(1 / 3)
```

Get an angle in radians:

```js
rng.angle()
```

## Limitations

### Insecure by Design

If you’ve gotten to the point of perusing people’s personal RNG libraries on GitHub, you almost certainly know this already and it probably doesn’t need to be said, but I’ll say it anyway as a precaution.

None of these methods for random number generation are cryptographically secure. Rung should never be used in any situation where an adversary could cause problems by predicting the next number or sequence of numbers. Rung shouldn’t be used for hashing or ID generation either.

In all of these use cases, more specialised and well-tested algorithms exist that go beyond what general purpose PRNG algorithms are designed to do.

There’s an interesting school of thought arguing that languages and software libraries should offer cryptographically secure RNGs by default and PRNGs should be avoided altogether. Rather than make the wrong thing hard to do, make it impossible!

This makes sense if you believe that the benefits of simple APIs for random number generation are outweighed by the harm caused when they’re abused, but this is a design principle I disagree with as a whole. If your code is calculating a damage modifier from a simulated weapon hit or deciding whether to render a floor tile or wall tile at point {x,y} in a dungeon, an intricate cryptographically secure RNG is unrestrainedly overengineered. It’s okay to trust people to use the right tool for the job.

### Precision

Most high quality modern prng algorithms use 64 bit unsigned integers to represent their internal state which poses a big problem for implementing them in JavaScript where all numbers are represented in the IEEE-754 floating point format which—after the sign and exponent—leaves 53 bits for the mantissa.

While it *is* possible to handle 64 bit addition and multiplication in JavaScript, it’s annoyingly laborious to implement (splitting values into high and low chunks and operating on them separately) and will degrade performance. Despite whatever level of precision we use to represent the internal state of the RNG, if we want to return a `Number` type, we’ll aways be constrained to dumping less than 64 bits of randomness into the output value.

This might be okay though. Although several of the widely used 32 bit algorithms are known to fail highly precise statistical tests of randomness, we just have to accept this as a limitation. As long as the generators we use are fast enough—ie: not orders of magnitude slower than `Math.random`—and exhibit a similar period length and quality of output to `Math.random`, they can be successfully used for games, simulations and generative methods.

### Rejection Sampling

Rung’s underlying method of converting values in the half open interval [0..1) to integers (multiplying by the inclusive range, then flooring the result to reach a whole number) introduces a bias into the uniform distribution.

A more reliable method using rejection sampling is possible. This isn’t implemented in Rung (yet) as it’s more complicated to maintain and its effects are opaque and not obvious in practice. The vast majority of small games, visualisations and generators will only see small benefits (or none at all) from the statistically sound approach.

## Future Research

We could consider using the new `BigInt` type in JavaScript, which supports arbitrary precision. But this would constrain our generators to working with `BigInt` only, as this type is incommensurable with the standard `Number` type and can’t be converted (for obvious reasons—if your value can be accurately represented in 64 bit floating point you don’t actually need the precision that `BigInt` offers).

The most promising future direction is probably with WebAssembly, which supports 64 bit integers without imposing specific signed or unsigned semantics. It is definitely possible (and in fact, quite straightforward) to compile existing PRNG algorithms written in C into WebAssembly and call them from JavaScript via Emscripten. Whether this is feasable for an NPM package and useful in practice needs further investigation.

## License

This package is copyright 2015-2022 Mark Rickerby and distributed freely under the terms of the MIT License. See the LICENSE file packaged with this software distribution.
