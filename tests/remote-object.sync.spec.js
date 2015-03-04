var expect = require('unexpected/unexpected');
var RemoteObject = require('../src/remote-object');

describe('RemoteObject', function() {

    describe('synchronize objects', function() {
        it('can synchronize property', function() {
            var object1 = new RemoteObject({
                uri: '/object/1',
                property: false
            });

            var object2 = new RemoteObject({
                uri: '/object/1',
                property: false
            });
            object1.property = true;
            expect(object2.property, 'to be true');
            object1.dispose();
            object2.dispose();
        });

        it('can synchronize array pop method', function() {
            var object1 = new RemoteObject({
                uri: '/object/1',
                array: []
            });

            var object2 = new RemoteObject({
                uri: '/object/1',
                array: []
            });
            object1.array.push(1);
            expect(object2.array, 'to equal', [1]);
            object1.dispose();
            object2.dispose();
        });

        it('can synchronize nested array pop method', function() {
            var object1 = new RemoteObject({
                uri: '/object/1',
                object: {
                    array: []
                }
            });

            var object2 = new RemoteObject({
                uri: '/object/1',
                object: {
                    array: []
                }
            });
            object1.object.array.push(1);
            expect(object2.object.array, 'to equal', [1]);
            object1.dispose();
            object2.dispose();
        });

        it('can synchronize inserted array items', function() {
            debugger;
            var object1 = new RemoteObject({
                uri: '/object/1',
                object: {
                    array: []
                }
            });

            var object2 = new RemoteObject({
                uri: '/object/1',
                object: {
                    array: []
                }
            });

            var newItem = new RemoteObject({
                id: 2,
                uri: '/object/2',
                property: false
            });
            object1.object.array.push(newItem);
            object1.object.array[0].property = true;

            expect(object1.object.array.length, 'to equal', 1);
            expect(object2.object.array.length, 'to equal', 1);
            expect(object1.object.array[0].property, 'to be true');
            expect(object2.object.array[0].property, 'to be true');

            object1.dispose();
            object2.dispose();
        });
/*
        it('can synchronize inserted array items', function() {
            var remoteObject = new RemoteObject({
                uri: 'object/1',
                property: false,
                object1: {
                    array1: [{
                        object2 : {
                            property: false
                        }}]
                }
            });

            var remoteObject2 = new RemoteObject({
                uri: 'object/1',
                property: false,
                object1: {
                    array1: [{
                        object2 : {
                            property: false
                        }}]
                }
            });
            remoteObject.object1.array1[0].object2.property = true;
            expect(remoteObject2.object1.array1[0].object2.property, 'to be true');

            remoteObject.dispose();
            remoteObject2.dispose();
        });

        it('can synchronize reorder items', function() {
            var remoteObject = new RemoteObject({
                uri: 'object/1',
                array: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 }
                ]
            });

            remoteObject.array.splice(0, 1);
            remoteObject.array.splice(0, 0, { id: 1 });


            remoteObject.array.splice(0, 1);
            remoteObject.array.splice(0, 0, { id: 1 });

            remoteObject.array.splice(0, 1);
            remoteObject.array.splice(0, 0, {
                id: 1
            });
            remoteObject.array.splice(0, 1);
            remoteObject.array.splice(0, 0, {
                id: 1
            });
            remoteObject.array.splice(0, 1);
            remoteObject.array.splice(0, 0, {
                id: 1
            });

            expect(remoteObject.array[0].id, 'to equal', 1);
        });*/
    });
});
