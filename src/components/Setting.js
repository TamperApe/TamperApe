/*global chrome*/

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Switch, Input, DatePicker } from 'antd';
import './Setting.css';
import moment from 'moment';
const Storager = require('../lib/Storager');

export class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoBuy: true,
            preventAD: false
        }
    }
    //界面加载成功
    async componentDidMount() {
        let buyDate = await Storager.getStorage("buyDate", true, new Date());
        if (buyDate)
            buyDate = moment(buyDate);
        //异步加载数据
        this.setState({
            autoBuy: await Storager.getStorage("autoBuy", true, true),
            preventAD: await Storager.getStorage("preventAD", true, false),
            uid: await Storager.getStorage("uid"),
            pwd: await Storager.getStorage("pwd"),
            phone: await Storager.getStorage("phone"),
            buyDate: buyDate,
        });
        // alert(this.state.buyDate);
    }
    toggleAutoBuy = async (checked) => {
        this.setState({
            autoBuy: checked,
        });
        await Storager.setStorage("autoBuy", checked);
    }
    togglePreventAD = async (checked) => {
        this.setState({
            preventAD: checked,
        });
        await Storager.setStorage("preventAD", checked);
        chrome.runtime.sendMessage({ api: 'preventAD', value: checked }, function (response) {
        });
    }
    // uidChanged = async (e) => {
    //     let value = e.target.value;
    //     this.setState({
    //         uid: value,
    //     });
    //     await Storager.setStorage("uid", value);
    // }
    // pwdChanged = async (e) => {
    //     let value = e.target.value;
    //     this.setState({
    //         pwd: value,
    //     });
    //     await Storager.setStorage("pwd", value);
    // }
    txtChanged = async (e) => {
        let value = e.target.value;
        this.setState({
            [e.target.id]: value,
        });
        await Storager.setStorage(e.target.id, value);
    }
    onDateChange = async (date, dateString) => {
        // alert("t" + date);
        if (date)
            date = moment(date);
        this.setState({
            buyDate: date,
        });
        await Storager.setStorage('buyDate', date);
    }
    render() {
        const columns = this.columns;
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <span>
                            自动购买
                            </span>
                        <Switch onChange={this.toggleAutoBuy} checked={this.state.autoBuy} />
                    </Col>
                    <Col span={2}>
                        <span>
                            屏蔽广告
                            </span>
                        <Switch onChange={this.togglePreventAD} checked={this.state.preventAD} />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <Input placeholder="账号" id="uid" onChange={this.txtChanged} value={this.state.uid} />
                    </Col>
                    <Col span={2}>
                        <Input placeholder="密码" id="pwd" onChange={this.txtChanged} type="password" value={this.state.pwd} />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <Input placeholder="电话号码" id="phone" onChange={this.txtChanged} value={this.state.phone} />
                    </Col>
                    <Col span={5}>
                        <DatePicker placeholder="购买日期" onChange={this.onDateChange} value={this.state.buyDate} />
                    </Col>
                </Row>
            </div>
        );
    }
}