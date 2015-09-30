var NewMessage = require('../../src/messages/new-message');
var expect = require('unexpected');

describe('new message', function() {
    it('can create message', function() {
        var message = new NewMessage('/uri', {});
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'new');
    });
    it('can get message data', function() {
        var message = new NewMessage('/uri', {});
        expect(message.getData(), 'to equal', {
            id: '/uri',
            data: {},
            type: 'new'
        });
    });
    it('can process new message on array', function() {
        var message = new NewMessage('/object/array', { id: '/object/array/1', text: 'tst' });
        var obj = message.process({ id: '/object',  array: [] });

        expect(obj, 'to equal', { id: '/object',  array: [{ id: '/object/array/1', text: 'tst' }] });
    });
    it('can process new message on nested array', function() {
        var message = new NewMessage('/object/object/array', { id: '/object/object/array/1', text: 'tst' });
        var obj = message.process({ id: '/object' });

        expect(obj, 'to equal', { id: '/object',  object: { array: [{ id: '/object/object/array/1', text: 'tst' }] }});
    });
});
