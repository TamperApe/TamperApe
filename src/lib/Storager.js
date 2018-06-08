/*global chrome*/
var Storager = {
    //获取本地存储
    getStorage: function (key, returnObject, defaultValue) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key,
                function (result) {
                    result = result[key];
                    if (returnObject === true && result !== undefined && result !== "") {
                        result = JSON.parse(result);
                    } else if (returnObject === true) {
                        if (defaultValue !== undefined)
                            result = defaultValue;
                        else
                            result = {}
                    }
                    resolve(result);
                }
            );
        });
    },
    //设置本地存储
    setStorage: function (key, value) {
        return new Promise((resolve, reject) => {
            if (typeof (value) === "object") {
                value = JSON.stringify(value);
            }

            var setData = {};
            setData[key] = value;

            chrome.storage.local.set(setData, function () {
                resolve(value);
            })
        });
    }
}


module.exports = Storager;