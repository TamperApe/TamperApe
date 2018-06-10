import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import { Table, DatePicker, InputNumber, Switch } from 'antd';
import { EditableCell } from './EditableCell'
import moment from 'moment';
import ScriptsManager from '../lib/ScriptsManager';
import { Button } from 'antd/lib/radio';

const Storager = require('../lib/Storager');

export class ScriptList extends Component {
    constructor(props) {
        super(props);
        //初始化state
        this.state = {
            data: []
        }
        this.columns = [
            // {
            //     title: 'ID',
            //     dataIndex: 'id',
            //     width: 150
            // },
            {
                title: '名称',
                dataIndex: 'name',
                render: text => <Link to={`/ScriptInfo/${text}`}> {text}</Link>,
                width: 250
            },
            {
                title: '描述',
                dataIndex: 'description',
                width: 150
            },
            {
                title: '版本号',
                dataIndex: 'version',
                width: 150
            }, {
                title: '已启用',
                dataIndex: 'enabled',
                render: (text, record) => <Switch
                    onChange={this.onCellChange(record.id, 'enabled')} checked={record.enabled} />,
                width: 150
            }, {
                title: '操作',
                render: (text, record) => <Button onClick={this.btnDeleteScript(record.id)}>删除脚本</Button>
            }];
    }

    //界面加载成功
    async componentDidMount() {
        //异步加载数据
        await this.UpdateUIList();
    }

    async UpdateUIList() {
        // var sdata = await Storager.getStorage("ScriptList", true, []);
        var sdata = await ScriptsManager.getScriptList();
        this.setState({
            data: sdata,
        });
    }

    btnDeleteScript(id) {
        return async () => {
            var sdata = await ScriptsManager.deleteScript(id);
            await this.UpdateUIList();
        }
    }

    onCellChange(id, dataIndex) {
        return async (value) => {
            const dataSource = [...this.state.data];
            const target = dataSource.find(item => item.id === id);
            if (target) {
                target[dataIndex] = value;

                await ScriptsManager.updateScript(target);
                await this.UpdateUIList();
                // this.setState({ dataSource });
                // await Storager.setStorage("ScriptList", dataSource);
            }
        };
    }
    loadFile(file) {
        return new Promise((resolve, reject) => {
            var fr = new FileReader();
            fr.onload = (e) => {
                resolve(e.target.result)
            };
            fr.readAsText(file);
        });
    }
    async readFile(evt) {
        console.log("readFile");
        let tempScripts = [];
        let totalLength = evt.target.files.length;
        let index = 0;
        for (const file of evt.target.files) {
            if (file) {
                let contents = await this.loadFile(file);
                await ScriptsManager.appedScript(contents);
            }
        }
        await this.UpdateUIList();
    }
    render() {
        const columns = this.columns;
        return (
            <Table
                rowKey={(r, i) => (i)}
                scroll={{ y: this.props.height - 130 }}
                columns={columns}
                dataSource={this.state.data}
                bordered
                title={() => (
                    <input type='file' multiple="multiple"
                        onChange={(event) => {
                            this.readFile(event)
                        }}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                )}
                pagination={false}
                footer={() => ''}
            >
            </Table>
        );
    }
}