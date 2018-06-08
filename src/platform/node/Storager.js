var Storager = {
    //获取本地存储
    getStorage: function (key, returnObject) {
        return new Promise((resolve, reject) => {
            var value = localStorage.getItem(key);
            if (returnObject === true && value !== "") {
                value = JSON.parse(value);
            } else if (returnObject === true) {
                value = {}
            }
            resolve(value);
        });
    },
    //设置本地存储
    setStorage: function (key, value) {
        return new Promise((resolve, reject) => {
            if (typeof (value) === "object") {
                //TODO 字符串下标转换失败
                value = JSON.stringify(value);
            }

            localStorage[key] = value;
        });
    }
}


module.exports = Storager;