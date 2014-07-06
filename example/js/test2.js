var test2 = {};

(function () {
    test2.logSave = function (userName, log) {
        if (log) {
            console.log(userName);
        }
    };

    test2.saveUser = function (userName, callback) {
        callback();

        $.post('/save', {'userName': userName});
        test2.logSave(userName, false);
    };

    test2.getUser = function (userName) {
        console.log('eeeeooooooo');

        return {
            'name': 'Juan',
            'lastName': 'Alcántara'
        }
    }

    test2.getLastName = function (userName) {
        var user = test2.getUser(userName);

        return user.lastName;

    };

    test2.sendMessage = function (userName) {
        var user = test2.getUser(userName);

        test2.messages.mobile(user.id);
        test2.messages.email(user.id);

        return true;
    };

    test2.messages = {
        mobile: function (id) {
            console.log('mobile');
        },
        email: function (id) {
            console.log('email');
        },
        phone: function (id) {
            console.log('phone');
        }
    };

    test2.wakeUp = function () {
        console.log('wake up!!!');

        return true;
    };

    test2.alarm = function () {
        setTimeout(function () {
            test2.wakeUp();
        }, 5000);
    };

    test2.getAllUsers = function (callback) {
        $.ajax({
            url: "/myapp/users.json",
            success: callback
        });
    };
}())
