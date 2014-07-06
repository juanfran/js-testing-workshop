var userManager = new UserManager();

var userListView = function () {
  var list = $("#list");

  function show () {
    list.show();
  }

  function add () {
    var value = $("#new").val();

    userManager.add(value);
  }

  function load () {
    var users = userManager.get();

    for(var i = 0; i < users.length; i++) {
      $('<li>')
        .text(users[i])
        .appendTo(list);
    }
  }

  $("#show").on('click', show);
  $("#load").on('click', load);
  $("#add").on('click', add);
};
