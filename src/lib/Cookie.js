/*global chrome*/
var Cookie = {
    //获取本地存储
    remove: function (url, name) {
        return new Promise((resolve, reject) => {
            chrome.cookies.remove({
                url: url,
                name: name
            }, (item) => {
                resolve({
                    url: item.url,
                    name: item.name,
                    storeId: item.storeId
                });
            });
        });
    }
}


module.exports = Cookie;