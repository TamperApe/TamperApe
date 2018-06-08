import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import { Row, Col, Table, DatePicker, Switch, InputNumber } from 'antd';
import moment from 'moment';
import { Label } from './Label';
import { Text } from './Text';
import { Toggle } from './Toggle';
import { Date } from './Date';
import { Number } from './Number';
import { Tb } from './Tb';
const Storager = require('../../lib/Storager');


export class ConfigItem extends Component {
    constructor(props) {
        super(props);
        //初始化state
        this.state = {
            configs: [],
            scriptName: props.scriptName,
            key: "0"
        }
    }

    //界面加载成功
    async componentDidMount() {
        let newConfigs = this.props.configs;
        for (const item of newConfigs) {
            let temp = await Storager.getStorage(`${this.state.scriptName}.${item.key}`);
            if (temp !== undefined)
                item.value = temp;
        }

        this.setState({
            configs: newConfigs
        });
    }

    saveData = async (key, updateConfig) => {
        let configs = this.state.configs;
        let config = configs.find((item) => {
            return item.key === key
        });

        if (config) {
            updateConfig(config);
        }

        key = `${this.state.scriptName}.${key}`;
        await Storager.setStorage(key, config.value);
    }

    commonDataChanged = async (sender, data) => {
        function updateConfig(config) {
            config.value = data;
        }

        this.saveData(sender.props.config.key, updateConfig);
    }

    section(item, parentIndex) {
        let key = `${item.key}${this.state.key}`;
        switch (item.type) {
            case 'label':
                return <Label key={key} config={item} />;
            case 'text':
                return <Text key={key} config={item} onChange={this.commonDataChanged} />;
            case 'number':
                return <Number key={key} config={item} onChange={this.commonDataChanged} />;
            case 'password':
                return <Text key={key} type='password' config={item} onChange={this.commonDataChanged} />;
            case 'date':
                return <Date key={key} config={item} onChange={this.commonDataChanged} />;
            case 'toggle':
                return <Toggle key={key} onChange={this.commonDataChanged} config={item} />;
            case "table":
                return <Tb key={key} onChange={this.commonDataChanged} config={item} />;
        }
    }

    render() {
        return (
            this.state.configs.map((item, index) => {
                return <div key={item.key}>
                    <Row type="flex" justify="start">
                        <Col span={3}>
                            <span>
                                {item.desc}
                            </span>
                        </Col>
                        <Col span={1}>
                            <span>
                                :
                    </span>
                        </Col>
                        <Col span={20}>
                            <span>
                                {this.section(item, index)}
                            </span>
                        </Col>
                    </Row>
                </div>
            })
        );
    }
}