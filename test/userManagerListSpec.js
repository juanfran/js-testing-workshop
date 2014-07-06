describe('test user list', function () {
  beforeEach(function () {
    document.body.innerHTML = window.__html__['test/fixtures/list.html'];
    userListView();
  });

  it('show list', function () {
    expect($('#list')).to.be.hidden;

    $("#show").click();

    expect($('#list')).to.be.visible;
  });

  it('add new user', sinon.test(function () {
    var mock = this.mock(userManager);

    mock.expects('add').once().withExactArgs('new user');

    $('#new').val('new user');
    $('#add').click();

    expect(mock.verify()).to.be.true;
  }));

  it('load user list', sinon.test(function () {
    this.stub(userManager, 'get').returns(['user 1', 'user 2']);

    $("#load").click();

    var list = $("#list li");

    expect($(list[0])).to.have.text('user 1');
    expect($(list[1])).to.have.text('user 2');
  }));
});
