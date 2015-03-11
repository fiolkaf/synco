var NewMessage = require('../../src/messages/new-message');
var expect = require('unexpected/unexpected');

describe('new message', function() {
    it('can create message', function() {
        var message = new NewMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'new');
    });
    it('can create message with data', function() {
        var message = new NewMessage('/uri', { hello: 'world' });
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'new');
        expect(message.data, 'to equal', { hello: 'world'} );
    });
    it('can get message data', function() {
        var message = new NewMessage('/uri');
        expect(message.getData(), 'to equal', {
            uri: '/uri',
            type: 'new',
            data: undefined
        });
    });
    it('can process message', function() {
        var message = new NewMessage('/uri');
        var obj = message.process();
        expect(obj, 'to equal', {
            _uri: '/uri'
        });
    });
});
