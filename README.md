[![Build Status](https://travis-ci.org/fiolkaf/synco.svg?branch=master)](https://travis-ci.org/fiolkaf/synco)

# synco - modify object properties with uri paths

## Usage:
```
npm install synco
```
```javascript
var synco = require('synco').Synco;
var synco = synco({id : '/root'}); // create new synco object
synco.set('/root/name', 'test_name');
/*{
  id: '/root',
  name: 'test_name'
}*/

synco.update('/root/name', 'new_name'); // update property
/*synco.data() === {
  id: '/root',
  name: 'new_name'
}*/

synco.delete('/root/name'); // delete property
/*synco.data() === {
  id: '/root'
}*/
```

### Messages:

Synco object can be decomposed to message list:
```javascript
var synco = synco({
  id : '/root',
  property: 'value',
});

var messages = synco.messages(); // [ messages.new('/root'), messages.set('/property', name) ]
```

and can be constructed from messages:
```javascript
var synco = synco({id : '/root'}); // create new synco object
synco.process([
  messages.set('/root/property', 'name')        // { id: '/root', property: 'name' }
  messages.update('/root/property', 'new_name') // { id: '/root', property: 'new_name' }
  messages.delete('/root/property')             // { id: '/root' }
]);

var result = messages.get('/root/id').process(obj); // '/root'
```
