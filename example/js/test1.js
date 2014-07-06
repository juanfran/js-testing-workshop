var calculadora = (function () {
    return {
        sumar: function () {
            var total = 0;

            for (var i = 0; i < arguments.length; i++) {
                total += arguments[i];
            }

            return total;
        }
    }
}());


var saveUser = function (user, callback) {
    setTimeout(function () {
        callback(user, true);
    }, 500);
};
