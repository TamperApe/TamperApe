/*global chrome*/
var ChromeMessager = {
    //获取本地存储
    sendMessage: function (api, data) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                api: api,
                data: data,
            }, function (response) {
                // console.log("response:", response)
                resolve(response);
            });
        });
    }
}


module.exports = ChromeMessager;