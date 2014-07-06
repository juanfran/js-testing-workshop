var userManager = new UserManager();

var userList = (function () {
  return {
    show: function () {
      $("#list").show();
    },
    add: function () {
      var value = $("#new").val();

      userManager.add(value);
    },
    load: function () {
      var users = userManager.get();
      var list = $('#list');

      for(var i = 0; i < users.length; i++) {
        $('<li>')
          .text(users[i])
          .appendTo(list);
      }
    }
  }
}());

var userListView = function () {
  $("#show").on('click', userList.show);
  $("#load").on('click', userList.load);
  $("#add").on('click', userList.add);
};
