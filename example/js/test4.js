var Map = function () {
    this.storage = {};
};

Map.prototype.set = function (key, value) {
    this.storage[key] = value;
};

Map.prototype.get = function (key) {
    return this.storage[key];
};

Map.prototype.has = function (key) {
    return !!this.storage[key];
};

Map.prototype.delete = function (key) {
    delete this.storage[key];
};

Map.prototype.keys = function () {
    return Object.keys(this.storage);
};

Map.prototype.values = function () {
    var values = [];
    var keys = this.keys();

    for(var i = 0; i < keys.length; i++) {
        values.push(this.get(keys[i]));
    }

    return values;
};

Map.prototype.size = function () {
    return this.keys().length;
};
