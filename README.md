# [TamperApe](https://tamperApe.com/)


仅需几句代码即可植入js脚本到任何网页，增强你使用浏览器的快感（例如：抢个票什么的...)

## 开发的初衷：

* **封装基础设施**： 搭建浏览器插件基础代码太过枯燥，有时候只想做一个简单的浏览器插件，却要花很多时间从头开始。

* **可视化脚本参数配置**： Tampermoney是一个很成熟的框架，但是不支持给脚本可视化配置参数。

* **ES2017**： 使用最新的JS语法，（比如：CSharper最熟悉的async/await）。

## 示例：
保存下面脚本为test.js，然后通过插件导入。我们就完成了所有baidu网页的注入
```
new class test {
    constructor() {
        this.name = 'test';
        this.version = '1.0';
        this.run_at = ["document_start", "document_domloaded"];
        this.includes = ['.*://.*baidu.*'];
    }

    get_Script() {
        return function () {
            function test(type) {
                alert(type);
            }
        }
    }

    run_Script(type) {
        return function () {
            test(type);
        }
    }
}()
```
## 文档： 
* **[API定义](https://github.com/TamperApe/TamperApe/blob/master/src/userscripts/api.js)**


## 目前的不足：
* **浏览器支持**： 目前只支持Chrome，后续可能或支持其他浏览器。主要还是看各个浏览器对新语法的支持程度。
* **API**： 现在API数量很少，但理论上tampermonkey支持的都可以实现，有需求可以提交Issue。

## 开发环境:
* **nodejs**
* **vscode**

## 依赖类库：
* **React**
* **Antd**

##  编译方式：
```
 npm install & npm watch
 或者
 yarn install & yarn watch
```

## 插件部署:
* npm/yarn watch 生成buld文件夹
* 把build文件夹拖到Chrome浏览器中


 ## 技术交流qq群：
 * 全栈开发qq群，不限开发制语言 191034956
