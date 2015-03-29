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
            id: '/uri',
            type: 'delete',
        });
    });
    it('can process delete message on property', function() {
        var message = new DeleteMessage('/value');
        var obj = message.process({ id: '/', value: 'test' });
        expect(obj, 'to equal', { id: '/' });
    });
    it('can process delete message on array', function() {
        var message = new DeleteMessage('/array/id0', true);
        var obj = message.process({ id: '/', value: 'test', array: [{ id: '/array/id0' }] });
        expect(obj, 'to equal', { id: '/', value: 'test', array: [] });
    });
    it('can process delete message on array - int ids', function() {
        var message = new DeleteMessage('/array/1', true);
        var obj = message.process({ id: '/', value: 'test', array: [{ id: '/array/1' }] });
        expect(obj, 'to equal', { id: '/', value: 'test', array: [] });
    });
    it('can process delete message on nested property', function() {
        var message = new DeleteMessage('/object/property', true);
        var obj = message.process({ id: '/', object: { property: 'test' } });
        expect(obj, 'to equal', { id: '/', object: {} });
    });
    it('can process delete message on nested array', function() {
        var message = new DeleteMessage('/object/array/id0', true);
        var obj = message.process({ id: '/', value: 'test', object: { array: [{ id: '/object/array/id0' }] }});
        expect(obj, 'to equal', { id: '/', value: 'test', object: { array: [] }});
    });
});
