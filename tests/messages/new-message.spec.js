var NewMessage = require('../../src/messages/new-message');
var expect = require('unexpected/unexpected');

describe('new message', function() {
    it('can create message', function() {
        var message = new NewMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'new');
    });
    it('can get message data', function() {
        var message = new NewMessage('/uri');
        expect(message.data(), 'to equal', {
            type: 'new',
            uri: '/uri'
        });
    });
    it('can process message', function() {
        var message = new NewMessage('/uri');
        var obj = message.process();
        expect(obj, 'to equal', {
            uri: '/uri'
        });
    });
});
