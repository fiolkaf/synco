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
            uri: '/uri',
            type: 'get'
        });
    });
    it('can process message', function() {
        var message = new GetMessage('/property', true);
        var value = message.process({
            _uri: '/',
            property: true
        });
        expect(value, 'to equal', true);
    });
    it('can process message on array', function() {
        var message = new GetMessage('/array/id0', true);
        var obj = message.process({
            _uri: '/',
            value: 'test',
            array: [{
                _id: 'id0'
            }]
        });
        expect(obj, 'to equal', {
            _id: 'id0'
        });
    });
    it('can return itself', function() {
        var message = new GetMessage('/root', true);
        var obj = message.process({
            _uri: '/root',
            value: 'test'
        });
        expect(obj, 'to equal', {
            _uri: '/root',
            value: 'test'
        });
    });
});
