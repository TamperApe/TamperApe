/*global chrome*/
var Blocker = {
    filters: [
        'http://www.ssgdfs.com/shop/PopupMain?popupSeq=*',
        'http://www.ssgdfm.com/shop/PopupMain?popupSeq=*',
        // '*://www.baidu.com/*',
    ],

    blockingEnabled: false,

    onwebRequest: function (details) {
        // alert(3);
        console.log("检测到广告，自动关闭" + details.tabId);
        chrome.tabs.remove(details.tabId);
        return {
            cancel: true
        };
    },

    enable: function () {
        if (this.blockingEnabled) {
            return;
        }

        chrome.webRequest.onBeforeRequest.addListener(this.onwebRequest, {
            urls: this.filters
        }, ["blocking"]);

        this.blockingEnabled = true;
    },

    disable: function () {
        chrome.webRequest.onBeforeRequest.removeListener(this.onwebRequest);
        this.blockingEnabled = false;
    },

    toggleEnabled: function () {
        if (this.blockingEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    }
};

module.exports = Blocker;

// chrome.browserAction.onClicked.addListener(toggleEnabled);

// enable();