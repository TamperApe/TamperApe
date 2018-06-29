## 生成配置界面

### 自定义分类
* **对象**：configTaps
* **属性**：
    * **title**：分类标题
    * **key**：分类索引，选项根据这个key放到对应的分类下面
* **实例**：
```
        this.configTaps = [
            {
                title: "配置1", 
                key: 0, 
            }];
```


### 详细参数
* **对象**：configs
* **属性**：
    * **desc**：配置描述
    * **key**：用于代码读写配置的标识
    * **value**：默认值
    * **type**：类型（label,toggle,number,text,password,table）
    * **format**：格式化字符串（timestamp）
    * **tapKey**：所属分类key
    * **wd_column0**：第一列的宽度（选填 两列之和不超过24）
    * **wd_column1**：第二列的宽度（选填 两列之和不超过24）
    * **importToKey**：导入数据到指定列（table专用）
    * **removeWhenImport**：导入时移除字符串（table专用）
    * **columns**：列数据（table专用）
* **实例**：
```
        this.configs = [
            {
                desc: '参数1',
                key: 'para1',
                value: '',
                type: 'label',
                format: 'timestamp',
                tapKey: 0
            }, {
                desc: '参数2',
                key: 'para2',
                value: false,
                type: 'toggle',
                tapKey: 2,
                columns:[...] //看下一章节
            }]
```
* **columns**：
    * **title**：列标题
    * **key**：代码读写标识
    * **type**：类型（link,inputNumber,date,
    * **linkText**：覆盖value显示特定内容（type：link专用）
    * **width**：列宽度
    * **urlFormat**：网址格式化（"http://xxx.com?key=${value}"）
    * **defaultValue**：默认值
* **表格实例**：
```
            columns: [{
                        title: '参数1',
                        key: 'para1',
                        linkText: "网址",
                        type: 'link',
                        width: 150
                    },{
                        title: '参数2',
                        key: 'para2',
                        type: 'inputNumber',
                        defaultValue: 50,
                        width: 150
                    }]
```