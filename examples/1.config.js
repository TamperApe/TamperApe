/*global

 */
new class config {
    constructor() {
        this.name = 'config';
        this.version = '1.0';
        this.run_at = ["document_start", "document_domloaded"];
        this.includes = ['.*://.*baidu.*'];
        this.configTaps = [
            {
                title: "配置1",
                key: 0,
            },
            {
                title: "配置2",
                key: 1,
            }];
        this.configs = [
            {
                desc: 'desc1',
                key: 'desc11',
                value: '',
                type: 'label',
                format: 'timestamp',
                tapKey: 1
            }, {
                desc: 'desc2',
                key: 'desc2',
                value: false,
                type: 'label',
                tapKey: 1
            }, {
                desc: 'desc3',
                key: 'desc3',
                value: '',
                type: 'label',
                format: 'timestamp',
                tapKey: 1
            }, {
                desc: 'desc4',
                key: 'desc4',
                value: true,
                type: 'toggle',
                tapKey: 0
            }, {
                desc: 'desc5',
                key: 'desc5',
                value: true,
                type: 'toggle',
                tapKey: 0
            }, {
                desc: 'desc6',
                key: 'desc6',
                value: '',
                type: 'number',
                tapKey: 0
            }, {
                desc: 'desc7',
                key: 'desc7',
                value: '',
                type: 'text',
                tapKey: 0
            }, {
                desc: 'desc8',
                key: 'desc8',
                value: '',
                type: 'password',
                tapKey: 0
            }, {
                desc: 'desc9',
                key: 'desc9',
                value: '',
                type: 'text',
                tapKey: 0
            }, {
                desc: 'desc10',
                key: 'desc10',
                value: '',
                type: 'date',
                tapKey: 0
            }, {
                desc: '列表',
                key: 'test11',
                value: [],
                type: 'table',
                tapKey: 1,
                columns: [
                    {
                        title: 'columns1',
                        key: 'columns1',
                        linkText: "columns1",
                        type: 'link',
                        width: 150
                    },
                    {
                        title: 'columns2',
                        key: 'columns2',
                        type: 'InputNumber',
                        width: 150
                    },
                    {
                        title: 'columns3',
                        key: 'columns3',
                        type: "date"
                    }]
            }
        ];
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