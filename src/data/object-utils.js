function findDescendant(object, keys, createNonExisting) {
    var key = keys.shift();
    if (typeof key === 'undefined') {
        return object;
    }

    if (Array.isArray(object)) {
        var items = object.filter(item => {
            return item.id.split('/').pop() == key;
        });

        if (items.length === 0) {
            throw 'Item not found ' + key + ': ' + JSON.stringify(object);
        }

        return findDescendant(items[0], keys);
    } else {
        var hasProperty = object.hasOwnProperty(key);
        if (!hasProperty && !createNonExisting) {
            return null;
        }

        if (!hasProperty && createNonExisting) {
            object[key] = keys.length ? {} : createNonExisting;
        }

        return findDescendant(object[key], keys, createNonExisting);
    }
}

function getIds(object, id) {
    if (typeof id === 'undefined') {
        id = object.id;
    }

    if (!id) {
        throw 'Uri is not defined: ' + object ;
    }

    var result = [];
    Object.keys(object).forEach(function(key) {
        var property = object[key];
        if (typeof property !== 'object') {
            result.push({ id: id + '/' + key, value: property });
            return;
        }

        if (Array.isArray(property)) {
            result.push({ id: id + '/' + key, value: [] });
            property.forEach((item, i) => {
                if (Array.isArray(item)) {
                    throw 'Nested arrays not supported';
                }

                if (!item.hasOwnProperty('id')) {
                    throw 'Unidentified array item found, all array items must have id defined';
                }

                result.push({ id: item.id, value: {}});
                Array.prototype.push.apply(result, getIds(item, item.id));
            });
        } else {
            result.push({ id: id + '/' + key, value: {} });
            Array.prototype.push.apply(result, getIds(property, id + '/' + key));
        }
    });
    return result;
}

module.exports = {
    findDescendant: findDescendant,
    getIds: getIds
};
