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
        expect(message.data(), 'to equal', {
            type: 'set',
            uri: '/uri'
        });
    });
    it('can process set message', function() {
        var message = new SetMessage('/property', true);
        var obj = message.process({ uri: '/' });
        expect(obj, 'to equal', { uri: '/' , property: true });
    });
    it('can process set message on array', function() {
        var message = new SetMessage('/array/id1', { test: true });
        var obj = message.process({ uri: '/', value: 'test', array: [{ id: 'id0' }] });
        expect(obj, 'to equal', { uri: '/', value: 'test', array: [{ id: 'id0' }, { id: 'id1', test: true }] });
    });
    it('does not add multiple items with the same ids', function() {
        var message = new SetMessage('/array/id1', {});
        var obj = { uri: '/', value: 'test', array: [{ id: 'id0' }] };
        message.process(obj);
        message.process(obj);
        expect(obj, 'to equal', { uri: '/', value: 'test', array: [{ id: 'id0' }, { id: 'id1' }] });
    });
    it('supports simple array items', function() {
        var obj = { uri: '/', value: 'test', array: [] };
        var message = new SetMessage('/array/1', 1);
        message.process(obj);

        message = new SetMessage('/array/1', 1);
        message.process(obj);

        expect(obj, 'to equal', { uri: '/', value: 'test', array: [1, 1] });

        message = new SetMessage('/array', []);
        message.process(obj);
        expect(obj, 'to equal', { uri: '/', value: 'test', array: [] });
    });
});