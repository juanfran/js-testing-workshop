describe('test calculator', function () {
  it('add value', function () {
    var calculator = new Calculator();

    expect(calculator.add(2)).to.equal(2);
    expect(calculator.add(3)).to.equal(5);
    expect(calculator.add(3, 1, 2)).to.equal(11);
  });


  it('sub value', function () {
    var calculator = new Calculator(15);

    expect(calculator.sub(2)).to.equal(13);
    expect(calculator.sub(3)).to.equal(10);
    expect(calculator.sub(3, 1, 2)).to.equal(4);
  });

  it('get history', function () {
    var calculator = new Calculator(15);

    calculator.sub(2);
    calculator.sub(3);
    calculator.add(3, 1);

    expect(calculator.record).to.be.an('array');
    expect(calculator.record).to.have.length(4);
  });

  it('bigger', function () {
    var calculator = new Calculator(15);

    expect(calculator.bigger(40)).to.be.true;
    expect(calculator.bigger(10)).to.be.false;
  });

  it('smaller', function () {
    var calculator = new Calculator(15);

    expect(calculator.smaller(10)).to.be.true;
    expect(calculator.smaller(40)).to.be.false;
  });

  it('add random', function () {
    var calculator = new Calculator();

    var mock = sinon.mock(calculator);

    mock.expects('add').once().withArgs(sinon.match.number).returns(true);

    var result = calculator.addRandom();

    mock.verify();

    expect(result).to.be.true;
  });
});
