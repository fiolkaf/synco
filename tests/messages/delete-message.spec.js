var DeleteMessage = require('../../src/messages/delete-message');
var expect = require('unexpected/unexpected');

describe('delete message', function() {
    it('can create message', function() {
        var message = new DeleteMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'delete');
    });
    it('can get message data', function() {
        var message = new DeleteMessage('/uri');
        expect(message.data(), 'to equal', {
            type: 'delete',
            uri: '/uri'
        });
    });
    it('can process delete message on property', function() {
        var message = new DeleteMessage('/value');
        var obj = message.process({ uri: '/', value: 'test' });
        expect(obj, 'to equal', { uri: '/' });
    });
    it('can process delete message on array', function() {
        var message = new DeleteMessage('/array/id0', true);
        var obj = message.process({ uri: '/', value: 'test', array: [{ id: 'id0' }] });
        expect(obj, 'to equal', { uri: '/', value: 'test', array: [] });
    });
    it('can process delete message on nested property', function() {
        var message = new DeleteMessage('/object/property', true);
        var obj = message.process({ uri: '/', object: { property: 'test' } });
        expect(obj, 'to equal', { uri: '/', object: {} });
    });
    it('can process delete message on nested array', function() {
        var message = new DeleteMessage('/object/array/id0', true);
        var obj = message.process({ uri: '/', value: 'test', object: { array: [{ id: 'id0' }] }});
        expect(obj, 'to equal', { uri: '/', value: 'test', object: { array: [] }});
    });
});
