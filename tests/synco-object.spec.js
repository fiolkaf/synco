var synco = require('../src/synco-object');
var expect = require('unexpected/unexpected');

describe('syncoObject', function() {
    describe('init', function() {
        it('can create new synco object', function() {
            var object = synco().new('/root');
            expect(object, 'to be defined');
        });
        it('can modify new synco object', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .data();

            expect(object, 'to equal', {
                uri: '/root',
                name: 'test_name',
                array: [
                    {
                        id: 'id0',
                        property: true
                    }
                ]
            });
        });
    });
});
