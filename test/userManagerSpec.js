describe('test user manager', function () {
  beforeEach(function () {
    this.userManager = new UserManager();
  })

  it('add valid user', function () {
    sinon.stub(Validator, 'startWith');

    Validator.startWith.withArgs('a').returns(false);

    expect(this.userManager.add('john')).to.be.true;

    Validator.startWith.restore();
  });

  it('add invalid user', sinon.test(function () {
    this.stub(Validator, 'startWith');

    Validator.startWith.withArgs('a').returns(true);

    expect(this.userManager.add('john')).to.be.false;
  }));

  it('user callback', function () {
    var spy = sinon.spy();
    this.userManager.onAdd(spy);

    sinon.stub(Validator, 'startWith');
    Validator.startWith.withArgs('a').returns(false);

    this.userManager.add('john');

    expect(spy.calledOnce).to.be.true;

    Validator.startWith.restore();
  });

  it('save log entry', function () {
    var logs = ['xxx', 'yyy']

    this.userManager.addLog(logs[0]);
    this.userManager.addLog(logs[1]);

    expect(this.userManager.log).to.deep.equal(logs);
  });

  it('add new user, log', sinon.test(function () {
    this.stub(Validator, 'startWith');
    var mock = this.mock(this.userManager);

    Validator.startWith.withArgs('a').returns(false);
    mock.expects('addLog').once().withExactArgs('john added');

    this.userManager.add('john');

    expect(mock.verify());
  }));

  it('add new user, disable log', sinon.test(function () {
    this.stub(Validator, 'startWith');
    var mock = this.mock(this.userManager);

    Validator.startWith.withArgs('a').returns(false);

    this.userManager.logEnabled = false;

    mock.expects('addLog').never();

    this.userManager.add('john');

    expect(mock.verify()).to.be.true;
  }));

  it('sync users', sinon.test(function () {
    var callback = function () {};
    var mock = this.mock(jQuery);

    this.userManager.add('john');

    var customMatcher = sinon.match(function (users) {
      return !!users.length;
    });

    mock.expects('post')
      .once()
      .withExactArgs(sinon.match.any, customMatcher, callback);

    this.userManager.sync(callback);

    mock.verify();
  }));

  it('sync users with time', sinon.test(function () {
    var callback = function () {};
    var mock = this.mock(jQuery);

    this.clock = sinon.useFakeTimers();

    this.userManager.add('john');

    var customMatcher = sinon.match(function (users) {
      return !!users.length;
    });

    mock.expects('post')
      .once()
      .withExactArgs(sinon.match.any, customMatcher, callback);

    this.userManager.sync(callback, 500);

    this.clock.tick(510);

    mock.verify();

    this.clock.restore();
  }));
});
