var SetMessage = require('../../src/messages/set-message');
var expect = require('unexpected/unexpected');

describe('set message', function() {
    it('can create message', function() {
        var message = new SetMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'set');
    });
    it('can get message data', function() {
        var message = new SetMessage('/uri');
        expect(message.getData(), 'to equal', {
            id: '/uri',
            type: 'set'
        });
    });
    it('can process set message', function() {
        var message = new SetMessage('/property', true);
        var obj = message.process({ id: '/' });
        expect(obj, 'to equal', { id: '/' , property: true });
    });
    it('can process set message on array', function() {
        var message = new SetMessage('/array/id1', { test: true });
        var obj = message.process({ id: '/', value: 'test', array: [{ id: '/array/id0' }] });
        expect(obj, 'to equal', { id: '/', value: 'test', array: [{ id: '/array/id0' }, { id: '/array/id1', test: true }] });
    });
    it('does not add multiple items with the same ids', function() {
        var message = new SetMessage('/array/id1', {});
        var obj = { id: '/', value: 'test', array: [{ id: '/array/id01' }] };
        message.process(obj);
        message.process(obj);
        expect(obj, 'to equal', { id: '/', value: 'test', array: [{ id: '/array/id01' }, { id: '/array/id1' }] });
    });
    it('supports simple array items', function() {
        var obj = { id: '/', value: 'test', array: [] };
        var message = new SetMessage('/array/1', 1);
        message.process(obj);

        message = new SetMessage('/array/1', 1);
        message.process(obj);

        expect(obj, 'to equal', { id: '/', value: 'test', array: [1, 1] });

        message = new SetMessage('/array', []);
        message.process(obj);
        expect(obj, 'to equal', { id: '/', value: 'test', array: [] });
    });
});
