/*global chrome*/
const Blocker = require('../../lib/Blocker');
const Storager = require('../../lib/Storager');
const Cookie = require('../../lib/Cookie');


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function RegEvent() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(sender.tab ? "来自内容脚本：" + sender.tab.url : "来自应用");
            console.log("api：" + request.api, "data:", request.data);
            let data = request.data.data;
            let tabId = sender.tab.id;
            switch (request.api) {
                case "preventAD":
                    if (request.value)
                        Blocker.enable();
                    else
                        Blocker.disable();
                    break;
                case "ape_removeCookie":
                    // setTimeout(() => {
                    //     sendResponse({ test: '222' });
                    // }, 3000);
                    Cookie.remove(request.data.url, request.data.name).then((result) => {
                        sendResponse(result);
                    });
                    return true;
                    break;
                case "ape_getTab":
                    sendResponse(sender.tab);
                    break;
                case "chrome.tabs.reload":
                    chrome.tabs.reload(sender.tab.id, data, () => {
                        sendResponse(sender.tab);
                    });
                    return true;
                    break;
                case "ape_alarms.create":
                    chrome.alarms.create(tabId.toString(), {
                        when: Date.now() + data.interval
                    });

                    chrome.alarms.onAlarm.addListener(function (alarm) {
                        if (alarm.name === tabId.toString())
                            sendResponse();
                    });

                    return true;
                    break;
            }
        });


}

async function Init() {
    RegEvent();

    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({ url: 'index.html' });
    });

    let preventAD = await Storager.getStorage("preventAD", true, false);
    if (preventAD)
        Blocker.enable();
    else
        Blocker.disable();


    // chrome.tabs.create({ url: 'index.html' });
}

Init();
// alert(1);

//var test = chrome.webRequest; 

