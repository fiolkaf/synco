var messages = require('../src/messages');
var expect = require('unexpected/unexpected');

describe('message', function() {
    describe('build object', function() {
        var _messages = [
            messages.new('/root'),
            messages.set('/root/name', 'test_name'),
            messages.set('/root/array', []),
            messages.set('/root/array/id0', {}),
            messages.set('/root/array/id0/property', true)
        ];
        it('creates an object from messages', function() {
            var object = {};
            _messages.forEach(msg => {
                msg.process(object);
            });
            expect(object, 'to equal', {
                uri : '/root',
                name: 'test_name',
                array: [
                    {
                        id: 'id0',
                        property: true
                    }
                ]
            });
        });

    })
});
