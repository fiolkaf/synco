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
        expect(message.getData(), 'to equal', {
            uri: '/uri',
            type: 'delete',
        });
    });
    it('can process delete message on property', function() {
        var message = new DeleteMessage('/value');
        var obj = message.process({ _uri: '/', value: 'test' });
        expect(obj, 'to equal', { _uri: '/' });
    });
    it('can process delete message on array', function() {
        var message = new DeleteMessage('/array/id0', true);
        var obj = message.process({ _uri: '/', value: 'test', array: [{ _id: 'id0' }] });
        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [] });
    });
    it('can process delete message on nested property', function() {
        var message = new DeleteMessage('/object/property', true);
        var obj = message.process({ _uri: '/', object: { property: 'test' } });
        expect(obj, 'to equal', { _uri: '/', object: {} });
    });
    it('can process delete message on nested array', function() {
        var message = new DeleteMessage('/object/array/id0', true);
        var obj = message.process({ _uri: '/', value: 'test', object: { array: [{ _id: 'id0' }] }});
        expect(obj, 'to equal', { _uri: '/', value: 'test', object: { array: [] }});
    });
});
