const Hangul = require('hangul-js');
//
//
// function getCho(src) {
//     var cho = '';
//     for(var i=0; i<src.length; i++) {
//         var index = ((src.charCodeAt(i) - 44032) /28) / 21;
//         if(index >= 0) {
//             cho += String.fromCharCode(index + 4352);
//         }
//     }
//     console.log(cho);
//     return cho;
// }
//

export function findFullnameinJSON(obj, id) {
    result = "";
    const bArray = Array.isArray(obj);
    if (bArray) {
        for (let i = 0; i < obj.length; i++) {
            const departName = findFullnameinJSON(obj[i], id);
            if (departName.length > 0) {
                return departName;
            }
        }
    } else {
        const bHasChild = Object.keys(obj).indexOf("CHILD") >= 0;
        if (bHasChild) {
            for (var i = 0; i < obj.CHILD.length; i++) {
                const departName = findFullnameinJSON(obj.CHILD[i], id);
                if (departName.length > 0) {
                    return obj.NAME + " " + departName;
                }
            }
            return "";
        } else {
            if (obj.ID === id) {
                return obj.NAME;
            } else {
                return "";
            }
        }
    }
}

results = []

export function findNameinJSON(obj, findString, bStart) {
    if (bStart) results = [];
    const bArray = Array.isArray(obj);
    if (bArray) {
        for (let i = 0; i < obj.length; i++) {
            findNameinJSON(obj[i], findString, false);
        }
    } else {
        const bHasChild = Object.keys(obj).indexOf("CHILD") >= 0;
        if (bHasChild) {
            for (let i = 0; i < obj.CHILD.length; i++) {
                findNameinJSON(obj.CHILD[i], findString, false);
            }
        } else {
            if (obj.NAME.indexOf(findString) > -1) {
                const nameCard = {id: obj.ID, name: obj.NAME, pt: obj.PT, rt: obj.RT};
                results.push(nameCard);
            }

        }
    }

    return results;
}

//
// export function jobNameFromFullName(fullName){
//     const res = fullName.split(" ");
//     return res[res.length - 1];
// }

export function departNameFromFullName(fullName) {
    const res = fullName.split(" ");
    var departName = "";
    for (var i = 0; i < res.length - 1; i++) {
        departName = departName + " " + res[i];
    }
    return departName;
}
