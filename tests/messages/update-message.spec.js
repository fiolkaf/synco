var UpdateMessage = require('../../src/messages/update-message');
var expect = require('unexpected/unexpected');

describe('update message', function() {
    it('can create message', function() {
        var message = new UpdateMessage('/uri');
        expect(message, 'to be defined');
        expect(message.type, 'to equal', 'update');
    });
    it('can get message data', function() {
        var message = new UpdateMessage('/uri');
        expect(message.getData(), 'to equal', {
            uri: '/uri',
            type: 'update'
        });
    });
    it('can update root object message', function() {
        var message = new UpdateMessage('/', { banana: true });
        var obj = message.process({ _uri: '/', apple: true });
        expect(obj, 'to equal', { _uri: '/' , apple: true, banana: true });
    });
    it('can process message', function() {
        var message = new UpdateMessage('/property', true);
        var obj = message.process({ _uri: '/', apple: true });
        expect(obj, 'to equal', { _uri: '/' , apple: true, property: true });
    });
    it('can process update message on array - adds array item', function() {
        var message = new UpdateMessage('/array/id1', { test: true });
        var obj = message.process({ _uri: '/', value: 'test', array: [{ _id: 'id0' }] });
        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{ _id: 'id0' }, { _id: 'id1', test: true }] });
    });
    it('can process update message on array - new array item property', function() {
        var message = new UpdateMessage('/array/id0', { test: true });
        var obj = message.process({ _uri: '/', value: 'test', array: [{ _id: 'id0', apple: true }] });
        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{ _id: 'id0', apple: true, test: true }] });
    });
    it('does not add multiple items with the same ids', function() {
        var message = new UpdateMessage('/array/id1', {});
        var obj = { _uri: '/', value: 'test', array: [{ _id: 'id0' }] };
        message.process(obj);
        message.process(obj);
        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{ _id: 'id0' }, { _id: 'id1' }] });
    });
    it('supports simple array items', function() {
        var obj = { _uri: '/', value: 'test', array: [] };
        var message = new UpdateMessage('/array/1', 1);
        message.process(obj);

        message = new UpdateMessage('/array/1', 1);
        message.process(obj);

        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [1, 1] });

        message = new UpdateMessage('/array', []);
        message.process(obj);
        expect(obj, 'to equal', { _uri: '/', value: 'test', array: [1, 1] });
    });
    describe('arrays', function() {
        describe('add', function() {
            it('can add array items - primitive', function() {
                var obj = { _uri: '/', value: 'test', array: [] };
                var message = new UpdateMessage('/array', [1]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [1] });
            });
            it('can add array items - objects with _id', function() {
                var obj = { _uri: '/', value: 'test', array: [] };
                var message = new UpdateMessage('/array', [ {_id: 1, name: '1' }]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{_id: 1, name: '1' }] });
            });
            it('can add array items - objects with _uri', function() {
                var obj = { _uri: '/', value: 'test', array: [] };
                var message = new UpdateMessage('/array', [ {_uri: 1, name: '1' }]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{_uri: 1, name: '1' }] });
            });
        });
        describe('update', function() {
            it('can update array items - primitive', function() {
                var obj = { _uri: '/', value: 'test', array: [1] };
                var message = new UpdateMessage('/array', [1]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [1] });
            });
            it('can add array items - objects with _id', function() {
                var obj = { _uri: '/', value: 'test', array: [{_id: 1, name: '1' }] };
                var message = new UpdateMessage('/array', [ {_id: 1, name: '2' }]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{_id: 1, name: '2' }] });
            });
            it('can add array items - objects with _uri', function() {
                var obj = { _uri: '/', value: 'test', array: [{_uri: 1, name: '1' }] };
                var message = new UpdateMessage('/array', [ {_uri: 1, name: '2' }]);
                message.process(obj);
                expect(obj, 'to equal', { _uri: '/', value: 'test', array: [{_uri: 1, name: '2' }] });
            });
        });
    });
});
