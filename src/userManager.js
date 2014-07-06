var UserManager = function () {
  this.users = [];
  this.log = [];
  this.onAddCallback;
  this.logEnabled = true;
};

UserManager.prototype.addLog = function (text) {
  this.log.push(text);
};

UserManager.prototype.get = function () {
  return this.users;
};

UserManager.prototype.onAdd = function (callback) {
  this.onAddCallback = callback;
};

UserManager.prototype.add = function (name) {
  if (Validator.startWith('a')) {
    return false;
  }

  this.users.push(name);

  if (this.logEnabled) {
    this.addLog(name + ' added');
  }

  if (this.onAddCallback) this.onAddCallback();

  return true;
};

UserManager.prototype.sync = function (callback) {
  $.post('/success', this.users, callback);
};

var Validator = (function () {
  return {
    startWith: function (str, letter) {
      return str.charAt(0) === letter
    }
  }
})();
