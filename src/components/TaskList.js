import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Table, DatePicker, InputNumber } from 'antd';
import './TaskList.css';
import { EditableCell } from './EditableCell'
import moment from 'moment';

const Storager = require('../lib/Storager');



export class TaskList extends Component {
    constructor(props) {
        super(props);
        //初始化state
        this.state = {
            data: []
        }
        this.columns = [{
            title: '网址',
            dataIndex: 'uri',
            render: text => <a href={text} target='_blank'>网址</a>,
            width: 150
        },
        {
            title: '需购数量',
            dataIndex: 'buyCount',
            // render: (text, record) => (
            //     <EditableCell
            //         value={text}
            //         onChange={this.onCellChange(record.uri, 'buyCount')}
            //     />
            // ),
            render: (text, record) => (
                <InputNumber
                    value={text}
                    onChange={this.onCellChange(record.uri, 'buyCount')}
                />
            ),
            width: 150
        }, {
            title: '最后航班时间',
            dataIndex: 'lasBuyTime',
            key: 'lasBuyTime',
            render: (text, record) => <DatePicker
                onChange={this.onCellChange(record.uri, 'lasBuyTime')}
                value={text ? moment(text) : null} />,
        }];
        // this.tb = React.createRef();
        // alert(props.height);
    }

    //界面加载成功
    async componentDidMount() {
        //异步加载数据
        var sdata = await Storager.getStorage("WatchList", true, []);
        this.setState({
            data: sdata,
            // height: this.props.contentHeight,
        });
        // let tb = ReactDom.findDOMNode(this.tb.current);
        //  let { clientHeight, clientWidth } = tb;
        //   alert(clientHeight);
        //   alert(clientWidth);
        //   alert(tb.clientHeight);
        // this.setState({
        //     data: sdata,
        //     height: tb.clientHeight
        // });
    }

    onCellChange(uri, dataIndex) {
        return async (value) => {
            const dataSource = [...this.state.data];
            const target = dataSource.find(item => item.uri === uri);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
                await Storager.setStorage("WatchList", dataSource);
            }
        };
    }
    readFile(evt) {
        const data = this.state.data;
        var file = evt.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = async function (e) {
                var contents = e.target.result;
                //用Set取出重复
                var array = contents.split("\r\n").filter(item => item !== "" && item !== undefined);
                array = [...(new Set(array))];
                var newData = array.map(function (item) {
                    return { uri: item, buyCount: 50, lasBuyTime: null };
                });
                this.setState({
                    data: newData
                });
                await Storager.setStorage("WatchList", newData);
            }.bind(this);
            reader.readAsText(file);
        }
    }
    render() {
        const columns = this.columns;
        return (
            //ref={this.tb}
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