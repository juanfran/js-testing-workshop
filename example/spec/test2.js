/*
  Sinon
*/

/*
   spy, muy útil para probar callbacks.
   Si se usa el spy en un método ya existente lo sigue ejecutando.
*/
describe('save user', function () {
    it('save user success', function () {
        sinon.spy(jQuery, 'post');
        sinon.spy(test2, 'logSave'); // or test2.logSave = sinon.spy()

        var userName = "Juan";
        var callback  = sinon.spy();

        test2.saveUser(userName, callback);

        expect(callback.called).to.be.true;
        expect(jQuery.post.calledOnce).to.be.true;
        expect(test2.logSave.calledOnce).to.be.true;
        expect(test2.logSave.calledWith(userName)).to.be.true;

        //restore
        jQuery.post.restore();
        test2.logSave.restore();
    })

    it('save user success with sandbox', sinon.test(function () {
        this.spy(jQuery, 'post');
        this.spy(test2, 'logSave'); // or test2.logSave = this.spy()

        var userName = "Juan";
        var callback  = this.spy();

        test2.saveUser(userName, callback);

        expect(callback.called).to.be.true;
        expect(jQuery.post.calledOnce).to.be.true;
        expect(test2.logSave.calledOnce).to.be.true;
        expect(test2.logSave.calledWith(userName)).to.be.true;

    }))
})

/*
  stubs, igual que spy pero queremos definir que devuelve.
  Los stubs no ejecutan el código original
*/

describe('get users', function () {
    it ('get user last name', function () {
        var userName = 'Juan';
        var otherUser = {'name': 'Froilan', 'lastName': 'de todos los santos'};

        test2.getUser = sinon.stub();
        test2.getUser.withArgs(userName).returns(otherUser);

        var result = test2.getLastName(userName);

        expect(result).to.be.equal(otherUser.lastName);
        expect(test2.getUser.calledOnce).to.be.true;
    })
})


/*
  mocks, igual que stub pero tiene unas expectativas
  de comunicación, que si no se cumplen falla el test
*/

describe('send message', function () {
    it ('send message to a user', function () {
        var userName = 'Juan';
        var otherUser = {'id': 9, 'name': 'Froilan', 'lastName': 'de todos los santos'};
        var mock = sinon.mock(test2.messages);

        mock.expects('mobile').withArgs(otherUser.id).once();
        mock.expects('email').withArgs(otherUser.id).once();
        mock.expects('phone').never();

        test2.getUser = sinon.stub();
        test2.getUser.withArgs(userName).returns(otherUser);

        var result = test2.sendMessage(userName);

        expect(result).to.be.true;
        expect(test2.getUser.calledOnce).to.be.true;

        mock.verify();
    })
})


/*
  fake timer
*/

describe('alarm', function () {
    it ('call alarm', function () {
        test2.wakeUp = sinon.stub();

        this.clock = sinon.useFakeTimers();

        test2.alarm();

        this.clock.tick(6000);

        expect(test2.wakeUp.calledOnce).to.be.true;

        this.clock.restore;
    })
})


/*
  fake server
*/

describe('get all users', function () {
    it ('get the list of users', function () {
        var callback = sinon.spy();

        var userList = [
            {id: 1, name: 'Xavi'},
            {id: 2, name: 'Juan'}
        ];

        this.server = sinon.fakeServer.create();

        this.server.respondWith("GET", "/myapp/users.json",
                                [200, { "Content-Type": "application/json" },
                                 JSON.stringify(userList)]);

        test2.getAllUsers(callback);

        this.server.respond();

        expect(callback.called).to.be.true;

        this.server.restore();
    })
})
