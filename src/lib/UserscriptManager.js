// const ssgdfm = require('../userscripts/ssgdfm');
/*global
 chrome
 */

// import ssgdfmCommon from '../userscripts/ssgdfmCommon.js';
// import ssgdfmApiWay from '../userscripts/ssgdfmApiWay.js';
import api from '../userscripts/api.js';
import ScriptsManager from './ScriptsManager';
const Storager = require('./Storager');
const Cookie = require('./Cookie');
const ChromeMessager = require('./ChromeMessager');

class UserscriptManager {
    constructor() {
        this.initialized = false;
        //屏蔽打印
        console.log = function (e) { }
    }

    async init() {
        if (this.initialized)
            return;
        // this.injectScript(ssgdfmCommon);
        // this.userScript = [
        //     eval(ssgdfm),
        //     // ...eval(ssgdfmApiWay),
        // ];
        await this.loadScripts();
        // for (const userScriptItem of this.userScript) {
        //     userScriptItem.ape_getValue = async () => {
        //         alert('test');
        //     }
        // }

        this.regMsgEvent();
        this.initialized = true;
    }

    async loadScripts() {
        console.log("loadScripts1");
        this.userScript = await ScriptsManager.getScriptList();
        this.urlMatchedScripts = this.getUrlMatchedScript();

        console.log("loadScripts2", this.userScript);
        console.log("loadScripts3", this.urlMatchedScripts);
    }

    regMsgEvent() {
        var port = chrome.runtime.connect();
        window.addEventListener("message", async function (event) {
            // 我们只接受来自我们自己的消息
            if (event.source != window)
                return;

            console.log("UserScriptManager type:", event.data.type, "method: ", event.data.method);
            if (event.data.type && (event.data.type == "api")) {
                let result;
                switch (event.data.method) {
                    case "ape_getValue":
                        result = await Storager.getStorage(event.data.key, event.data.returnObject, event.data.defaultValue);
                        break;
                    case "ape_setValue":
                        result = await Storager.setStorage(event.data.key, event.data.value);
                        break;
                    case "ape_removeCookie":
                        // result = await Cookie.remove(event.data.url, event.data.name);
                        result = await ChromeMessager.sendMessage(event.data.method, {
                            url: event.data.url,
                            name: event.data.name
                        });
                        break;
                    case "ape_getTab":
                    case "ape_tabs.update":
                    case "ape_tabs.reload":
                    case "ape_alarms.create":
                        result = await ChromeMessager.sendMessage(event.data.method, event.data);
                        break;
                }
                console.log("UserScriptManager type:", event.data.type, "method: ", event.data.method, "result:", result);
                window.postMessage({ type: "page", method: event.data.method, result: result }, "*");
            }
        }, false);
    }
    //api 定义开始
    // async ape_getValue(name, returnObj, defaultValue) {
    //     // return new Promise((resolve, reject) => {
    //     alert("GM" + name);
    //     document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
    //         detail: name // Some variable from Gmail.
    //     }));
    //     // var result = await Storager.getStorage(name, returnObj, defaultValue)
    //     // return result;
    //     // resolve();
    //     // })
    // }

    injectScript(func, wrap, para) {
        console.log("injectScript");
        var actualCode = func;
        if (para === undefined)
            para = '';
        if (wrap)
            // actualCode = '(' + func + ')(' + para + ');'
            actualCode = `(${func})('${para}');`
        //alert(actualCode);
        var script = document.createElement('script');
        script.textContent = actualCode;
        //  alert('s  ' + actualCode);
        // (document.head || document.documentElement).appendChild(script);
        (document.head || document.documentElement).appendChild(script);
        // script.remove();
    }
    async resolve(type) {
        //注入函数
        console.log("resolve ", type)
        // this.injectScript(this.ape_getValue);
        for (const uscriptItem of this.urlMatchedScripts) {
            let temp = eval(uscriptItem.sourceCode);
            let script = temp.get_Script();
            if (!script)
                continue;
            // let script = uscriptItem.get_Script(type);
            if (type == "document_start") {
                //只插入一次用户脚本，后面通过 run_Script type调用不同的事件
                let currentScript = JSON.stringify(
                    {
                        name: uscriptItem.name,
                        id: uscriptItem.id
                    });
                //插入当前执行脚本的配置
                this.injectScript(`currentApeScript=${currentScript}`);
                this.injectScript(api);
                script = this.getFunctionBody(script);
                this.injectScript(script, false);
            }
            if (!this.RunAtMatched(temp, type))
                continue;

            // console.log("test");
            if (!uscriptItem.enabled)
                continue;
            let run_Script = temp.run_Script(type);
            let tempScript = this.getFunctionBody(run_Script);

            run_Script = `async function(type){
                ${tempScript}
            }`;
            this.injectScript(run_Script, true, type);
            // let commonScript = uscriptItem.get_CommonScript();
            // if (commonScript) {
            //     // console(commonScript);
            //     // this.injectScript(commonScript);
            //     let tempCommon = this.getFunctionBody(commonScript);
            //     let tempScript = this.getFunctionBody(script);
            //     // script = tempCommon + "\n" + getFunctionBody(script);

            //     script = `async function(){
            //         ${tempCommon}

            //         ${tempScript}
            //     }`;
            // }

        }
    }
    getFunctionBody(func) {
        if (typeof func !== "function")
            return func;
        func = func.toString();
        let leftBrace = func.indexOf("{") + 1;
        let rightBrace = func.lastIndexOf("}");
        let str = func.toString().substring(leftBrace, rightBrace);
        return str.trim();
    }
    document_domloaded() {
        this.resolve('document_domloaded')
    }
    document_body() {
        if (!document.body) {
            return;
        }

        clearInterval(this.timerWatchBody);
        this.resolve('document_body')
    }
    async document_start() {
        await this.init();

        document.addEventListener("DOMContentLoaded", this.document_domloaded.bind(this));
        window.onload = this.document_end.bind(this);
        this.timerWatchBody = setInterval(this.document_body.bind(this), 100);

        this.resolve('document_start')
    }
    document_idle() {
        this.resolve('document_idle')
    }
    document_end() {
        this.resolve('document_end')
    }

    //获取当前url匹配的脚本
    getUrlMatchedScript() {
        var topframe = window.self == window.top;
        console.log("topframe", topframe);

        console.log("getUrlMatchedScript");
        let currentUrl = window.location.toString();
        var result = this.userScript.filter(uscriptItem => {
            let matched = false;

            if (!topframe && uscriptItem.onlyTopFrame)
                return false;

            //检查url是否匹配
            for (var urlIndex = 0; urlIndex < uscriptItem.includes.length; urlIndex++) {
                var pattern = uscriptItem.includes[urlIndex];
                if (currentUrl.search(pattern) > -1) {
                    matched = true;
                    break;
                }
            }

            if (matched) {
                //注入函数
                // uscriptItem.script.ape_getValue = this.ape_getValue;

                return true;
            }
            return false;
        });
        return result;
    }

    //检查runat是否匹配
    RunAtMatched(uscriptItem, type) {
        console.log("getRunAtMatchedScript", type);
        //如果是数组匹配一个即可
        if (Array.isArray(uscriptItem.run_at)) {
            let temp = uscriptItem.run_at.find((tempItem) => {
                return tempItem === type;
            });
            if (!temp)
                return false;
        }
        else if (uscriptItem.run_at !== type)
            return false;

        return true;
    }
};
UserscriptManager.Singleton = new UserscriptManager();
// export let userscriptManager = new UserscriptManager();
export { UserscriptManager };

// var static userscriptManager = new UserscriptManager();
// export static function Instance() {
//     let userscriptManager = new UserscriptManager();
//     return;
// }