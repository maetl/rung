class Standard {
  value() {
    return Math.random();
  }
}

class Fixed {
  value() {
    return 0.4770875762153106;
  }
}

class Random {
  constructor() {
    this.source = new Fixed();
  }

  number(min, max) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return this.source.value() * (max - min) + min;
  }

  integer(min, max) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(this.source.value() * (max - min) + min);
  }

  percentage(precision) {
    if (precision == undefined) {
      return this.integer(101);
    } else {
      const number = this.number(100 + Number.MIN_VALUE);
      const decimalPattern = '^\\d+(?:\.\\d{0,' + precision + '})?';
      return parseFloat(number.toString().match(decimalPattern)[0]);
    }
  }

  angle() {
    return this.number(0, Math.PI * 2 + Number.MIN_VALUE);
  }
}

export default Random;
