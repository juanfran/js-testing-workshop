var Calculator = function (initial) {
  this.value = initial || 0;
  this.record = [];
};

Calculator.prototype.add = function () {
  for(var i = 0; i < arguments.length; i++) {
    this.value += arguments[i];
    this.record.push({method: 'add', value: arguments[i]})
  }

  return this.value;
};

Calculator.prototype.sub = function () {
  for(var i = 0; i < arguments.length; i++) {
    this.value -= arguments[i];

    this.record.push({method: 'sub', value: arguments[i]})
  }

  return this.value;
};

Calculator.prototype.bigger = function (value) {
  return this.value < value;
};

Calculator.prototype.smaller = function (value) {
  return this.value > value;
};
