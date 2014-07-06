describe('test user list actions', function () {
  beforeEach(function () {
    document.body.innerHTML = window.__html__['test/fixtures/list.html'];
    userListView();
  });

  it('show list', function () {
    expect($('#list')).to.be.hidden;

    $("#show").click();

    expect($('#list')).to.be.visible;
  });

  it('change color', function () {
    var color = "rgb(204, 61, 51)";

    for(var i = 0; i < 4; i++) {
      $('<li>')
        .css('color', 'red')
        .text('user' + i)
        .appendTo($("#list"));
    }

    $("#color").val(color).change();

    var lis = $('#list li');

    for(var i = 0; i < lis.length; i++) {
      expect($(lis[i])).to.have.css('color', color);
    }
  });

  it('add new user', sinon.test(function () {
    var userManagerMock = this.mock(userManager);
    var userListActionsMock = this.mock(userListActions);

    userManagerMock.expects('add').once().withExactArgs('new user');
    userListActionsMock.expects('load').once();

    $('#new').val('new user');
    $('#add').click();

    userManagerMock.verify();
    userListActionsMock.verify();
  }));

  it('remove user', sinon.test(function () {
    var userManagerMock = this.mock(userManager);
    var userListActionsMock = this.mock(userListActions);

    $('<li>')
      .text('remove user')
      .appendTo($("#list"));

    userManagerMock.expects('remove').once().withExactArgs('remove user');
    userListActionsMock.expects('load').once();

    $('#list li').click();

    userManagerMock.verify();
    userListActionsMock.verify();
  }));

  it('load user list', sinon.test(function () {
    this.stub(userManager, 'get').returns(['user 1', 'user 2']);

    $("#load").click();

    var list = $("#list li");

    expect($(list[0])).to.have.text('user 1');
    expect($(list[1])).to.have.text('user 2');
  }));

  it('uppercase list', sinon.test(function () {
    this.stub(userManager, 'get').returns(['user 1', 'user 2']);

    $("#uppercase").click();

    var list = $("#list li");

    expect($(list[0])).to.have.text('USER 1');
    expect($(list[1])).to.have.text('USER 2');
  }));
});
