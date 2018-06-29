/*global
 chrome
 currentApeScript
 */

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function ape_overriteConsoleLog(newLog) {
    // return;
    let sourceLog = window.console.log;
    if (!newLog)
        newLog = function (...e) {
            sourceLog(...e);
            document.title = [...e];
        };

    window.console.log = newLog;
    return sourceLog;
}

function ape_getCookies() {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair[1]);
    }
    return cookies;
}

function ape_getCookiesArray() {
    var pairs = document.cookie.split(";");
    var cookies = [];
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies.push({
            key: (pair[0] + '').trim(),
            value: unescape(pair[1])
        });
    }
    return cookies;
}

function ape_regAlertCallback(callBack) {
    var sourceAlert = alert;
    window.alert = function (e) {
        console.log("alert" + e);
        if (callBack)
            callBack(e);
    };
    return sourceAlert;
}

function ape_restoreAlter(sourceAlter) {
    window.alert = sourceAlter;
}

async function ape_getScriptValue(key, returnObject, defaultValue) {
    return await this.ape_getValue(currentApeScript.name + "." + key, returnObject, defaultValue);
}

async function ape_getValue(key, returnObject, defaultValue) {
    // alert(key);
    return new Promise((resolve, reject) => {
        let callBack = (event) => {
            if (event.data.type === "page" && event.data.method === 'ape_getValue') {
                window.removeEventListener("message", callBack);

                resolve(event.data.result);
            }
        };

        window.addEventListener("message", callBack);
        window.postMessage({ type: "api", method: "ape_getValue", key: key, returnObject: returnObject, defaultValue: defaultValue }, "*");
    });
}

async function ape_setScriptValue(key, value) {
    await this.ape_setValue(currentApeScript.name + "." + key, value);
}

async function ape_setValue(key, value) {
    return new Promise((resolve, reject) => {
        let callBack = (event) => {
            if (event.data.type === "page" && event.data.method === 'ape_setValue') {
                window.removeEventListener("message", callBack);

                resolve(event.data.result);
            }
        };

        window.addEventListener("message", callBack);
        window.postMessage({ type: "api", method: "ape_setValue", key: key, value: value }, "*");
    });
}

async function ape_removeCookie(url, name) {
    return new Promise((resolve, reject) => {
        let callBack = (event) => {
            if (event.data.type === "page" && event.data.method === 'ape_removeCookie') {
                window.removeEventListener("message", callBack);

                resolve(event.data.result);
            }
        };

        window.addEventListener("message", callBack);
        window.postMessage({ type: "api", method: "ape_removeCookie", url: url, name: name }, "*");
    });
}

function ape_callContainerApi(data, method) {
    return new Promise((resolve, reject) => {
        let callBack = (event) => {
            if (event.data.type === "page" && event.data.method === method) {
                window.removeEventListener("message", callBack);

                resolve(event.data.result);
            }
        };

        window.addEventListener("message", callBack);
        window.postMessage({ type: "api", method: method, data: data }, "*");
    });
}

async function ape_getTab() {
    let result = await ape_callContainerApi({}, "ape_getTab");
    return result;
}

async function ape_browser_tabs_update(data) {
    let result = await ape_callContainerApi(data, "ape_tabs.update");
    return result;
}

async function ape_browser_tabs_reload(data) {
    let result = await ape_callContainerApi(data, "ape_tabs.reload");
    return result;
}

async function ape_browser_alarm_create(data) {
    let result = await ape_callContainerApi(data, "ape_alarms.create");
    return result;
}

function ape_delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ape_executeAsync(fun, ms) {
    let timeNow = new Date();
    let endTime = new Date();
    // endTime.setSeconds(endTime.getSeconds() + ms);
    endTime.setMilliseconds(endTime.getMilliseconds() + ms);
    while (timeNow < endTime) {
        let isOk = fun();
        if (isOk)
            return true;
        await ape_delay(1000);
        timeNow = new Date();
    }

    return false;
}

async function ape_wait(selectors, ms) {
    await ape_executeAsync(() => {
        let temp = document.querySelectorAll(selectors)
        return temp !== "" && temp !== undefined && temp.length > 0;
    }, ms)
}
