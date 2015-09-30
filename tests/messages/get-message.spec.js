var expect = require('unexpected');
var GetMessage = require('../../src/messages/get-message');

describe('get message', function() {
    it('can create message', function() {
        var message = new GetMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'get');
    });
    it('can get message data', function() {
        var message = new GetMessage('/uri');
        expect(message.getData(), 'to equal', {
            id: '/uri',
            type: 'get'
        });
    });
    it('can process message', function() {
        var message = new GetMessage('/property', true);
        var value = message.process({
            id: '/',
            property: true
        });
        expect(value, 'to equal', true);
    });
    it('can process message on array', function() {
        var message = new GetMessage('/array/id0', true);
        var obj = message.process({
            id: '/',
            value: 'test',
            array: [{
                id: '/array/id0'
            }]
        });
        expect(obj, 'to equal', {
            id: '/array/id0'
        });
    });
    it('can return itself', function() {
        var message = new GetMessage('/root', true);
        var obj = message.process({
            id: '/root',
            value: 'test'
        });
        expect(obj, 'to equal', {
            id: '/root',
            value: 'test'
        });
    });
});
