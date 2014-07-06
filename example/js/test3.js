var test3 = {};

(function () {
    test3.combo = function (elm) {
        elm.find('#show').on('click', function () {
            $('#list').show();
        });

        elm.find('#remove').on('click', function () {
            $('#list li:last').remove();
        });
    };
}());
