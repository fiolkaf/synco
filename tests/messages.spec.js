var expect = require('unexpected');
var messages = require('../src/messages');

describe('message', function() {
    describe('build object', function() {
        var _messages = [
            messages.set('/root/name', 'test_name'),
            messages.set('/root/array', []),
            messages.set('/root/array/1', {}),
            messages.set('/root/array/1/property', true)
        ];
        it('creates an object from messages', function() {
            var object = { id: '/root' };
            _messages.forEach(msg => {
                msg.process(object);
            });
            expect(object, 'to equal', {
                id : '/root',
                name: 'test_name',
                array: [
                    {
                        id: '/root/array/1',
                        property: true
                    }
                ]
            });
        });

    });
});
