import React, { Component } from 'react';
import { Table, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import Common from '../../lib/Common';

const Storager = require('../../lib/Storager');
const uuidv5 = require('uuid/v5');


export class Tb extends React.Component {
    constructor(props) {
        Common.Init();
        super(props);
        //初始化state
        this.state = {
            data: []
        }
        console.log("test");
        let tempColus = props.config.columns;
        if (!tempColus)
            return;

        tempColus = tempColus.map(x => {
            return {
                title: x.title,
                dataIndex: x.key,
                render: (text, record) => this.renderItem(text, record, x),
                width: x.width
            }
        });

        this.columns = tempColus;
    }

    renderItem(text, record, column) {
        let url = text;
        if (column.urlFormat) {
            var template = (value) => eval("\`" + column.urlFormat + "\`");
            url = template(text);
        }
        switch (column.type) {
            case "text":
                return <span>{text}</span>;
            case "link":
                return <a href={url} target='_blank'>{column.linkText || text}</a>;
            case "InputNumber":
                return <InputNumber
                    value={text}
                    onChange={this.onCellChange(record.id, column.key)}
                />
            case "date":
                return <DatePicker
                    onChange={this.onCellChange(record.id, column.key)}
                    value={text ? moment(text) : null} />;
        }
    }

    //界面加载成功
    async componentDidMount() {
        //异步加载数据
        // var sdata = await Storager.getStorage("WatchList", true, []);
        let tempData = eval(this.props.config.value);
        this.setState({
            data: tempData,
        });
    }

    onCellChange(id, dataIndex) {
        return async (value) => {
            const dataSource = [...this.state.data];
            const target = dataSource.find(item => item.id === id);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
                if (this.props.onChange) {
                    this.props.onChange(this, this.state.data);
                }
            }
        };
    }
    readFile(evt) {
        const data = this.state.data;
        const config = this.props.config;
        var file = evt.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = async function (e) {
                var contents = e.target.result;
                //用Set取出重复
                var array = contents.split("\r\n").filter(item => item !== "" && item !== undefined);
                array = [...(new Set(array))];
                var newData = array.map(function (text) {
                    let result = {};
                    for (const columnItem of config.columns) {
                        result[columnItem.key] = columnItem.defaultValue;
                        result.id = uuidv5(Date.now().toString(), uuidv5.DNS);
                        if (columnItem.key === config.importToKey) {
                            if (config.removeWhenImport)
                                text = text.replaceAll(config.removeWhenImport, "");
                            result[columnItem.key] = text;
                        }
                    }

                    console.log("test");
                    return result;
                });
                this.setState({
                    data: newData
                });
                if (this.props.onChange) {
                    this.props.onChange(this, this.state.data);
                }
            }.bind(this);
            reader.readAsText(file);
        }
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
                    <input type='file'
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