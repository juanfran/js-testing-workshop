/*
var map = new Map()
map.set('John', 25)
map.set('Alice', 400)
map.get('John')
map.has('Alice') // true
map.delete('Alice')
map.keys()
map.values()
map.size() // 2
*/

describe('map', function () {
    var map;

    beforeEach(function () {
        map = new Map();
    })

    it('Map must be a function', function () {
        expect(Map).to.be.a('function');
    })

    it('add variable to the map', function () {
        var key = 'John';
        var value = 25;

        map.set(key, value);

        expect(map.storage[key]).to.be.eql(value);
    })

    it('get variable from map', function () {
        map.storage = {
            'John': 25,
            'Alice': 400
        };

        expect(map.get('John')).to.be.eql(25);
    })

    it('check if the value exist', function () {
        map.storage = {
            'John': 25,
            'Alice': 400
        };

        expect(map.has('John')).to.be.true;
        expect(map.has('Robert')).to.be.false;
    })

    it('delete a value', function () {
        map.storage = {
            'John': 25
        };

        map.delete('John');

        expect(map.storage['John']).to.be.undefined;
    })

    it('get keys', function () {
        map.storage = {
            'John': 25,
            'Alice': 400
        };

        expect(map.keys()).to.be.eql(['John', 'Alice']);
    })

    it('get values', function () {
        var stubKeys = sinon.stub(map, 'keys');
        stubKeys.returns(['Paul', 'Alice']);

        var stubGet = sinon.stub(map, 'get');
        stubGet.withArgs('Paul').returns(25);
        stubGet.withArgs('Alice').returns(400);

        expect(map.values()).to.be.eql([25, 400]);

        stubKeys.restore();
        stubGet.restore();
    })

    it('get size', function () {
        var stubKeys = sinon.stub(map, 'keys');
        stubKeys.returns(['Paul', 'Alice']);

        expect(map.size()).to.be.eql(2);

        stubKeys.restore();
    })
})
