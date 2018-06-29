## 内置API

### 源码：
* **[地址](https://github.com/TamperApe/TamperApe/blob/master/src/userscripts/api.js)** 

### 定义：
* **ape_overriteConsoleLog**：
* **ape_getCookies**：
* **ape_getCookiesArray**：
* **ape_regAlertCallback**：
* **ape_restoreAlter**：
* **ape_getScriptValue**：
* **ape_getValue**：
* **ape_setScriptValue**：
* **ape_setValue**：
* **ape_removeCookie**：
* **ape_callContainerApi**：
* **ape_getTab**：
* **ape_browser_tabs_update**：
* **ape_browser_tabs_reload**：
* **ape_browser_alarm_create**：
* **ape_delay**：延迟等待
    * ms：等待毫秒
* **ape_executeAsync**：异步执行一个函数，返回True停止
    * fun：执行函数，停止执行返回True
    * timeOutSeconds：超时时间
* **ape_wait**：等待指定选择器查询的内容出现
    * selectors：选择器
    * timeout ：超时时间，单位毫秒
