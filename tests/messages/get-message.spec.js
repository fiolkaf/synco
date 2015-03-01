var GetMessage = require('../../src/messages/get-message');
var expect = require('unexpected/unexpected');

describe('get message', function() {
    it('can create message', function() {
        var message = new GetMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'get');
    });
    it('can get message data', function() {
        var message = new GetMessage('/uri');
        expect(message.data(), 'to equal', {
            type: 'get',
            uri: '/uri'
        });
    });
    it('can process message', function() {
        var message = new GetMessage('/property', true);
        var value = message.process({
            uri: '/',
            property: true
        });
        expect(value, 'to equal', true);
    });
    it('can process message on array', function() {
        var message = new GetMessage('/array/id0', true);
        var obj = message.process({
            uri: '/',
            value: 'test',
            array: [{
                id: 'id0'
            }]
        });
        expect(obj, 'to equal', {
            id: 'id0'
        });
    });
});
