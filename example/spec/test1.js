/*
   mocha & chai
*/

describe('calculadora', function () {
    beforeEach(function () {

    })

    afterEach(function () {

    })

    it('puedo sumar', function () {
        var result1 = calculadora.sumar(2, 3);
        var result2 = calculadora.sumar(20, 32);

        expect(result1).to.be.equal(5);
        expect(result2).to.be.equal(52);
    })
})


/*
  async
  .only, .skip
*/

describe('usuarios', function () {
    it('guarda el usuario', function (done) {
        var user = {'name': 'Marianico'};

        var success = function (result1, result2) {
            expect(result1).to.be.equal(result1);
            expect(result2).to.be.true;

            done();
        };

        saveUser(user, success);
    });
});
