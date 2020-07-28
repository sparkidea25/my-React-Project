export function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        // eslint-disable-next-line
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

// Set focus in first faulty field
export function onSubmitFail(errors) {
    const errorEl = document.querySelector(
        Object.keys(flattenObject(errors)).map(fieldName => `[name="${fieldName}"]`).join(',')
    );
    errorEl.focus();
};