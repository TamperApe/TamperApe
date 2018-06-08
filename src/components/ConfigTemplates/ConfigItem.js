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
const Storager = require('../../lib/Storager');


export class ConfigItem extends Component {
    constructor(props) {
        super(props);
        //初始化state
        this.state = {
            configs: [],
            scriptName: props.scriptName,
            key: 0
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

        // this.setState({
        //     configs: configs
        // });

        // console.log(this.state.configs);
        key = `${this.state.scriptName}.${key}`;
        await Storager.setStorage(key, config.value);
    }

    toggleChanged = async (sender, checked) => {
        // console.log("toggle");
        function updateConfig(config) {
            config.value = !config.value;
        }

        this.saveData(sender.props.config.key, updateConfig);
    }

    dateChanged = async (sender, date) => {
        function updateConfig(config) {
            config.value = date;
        }

        this.saveData(sender.props.config.key, updateConfig);
    }

    onTextChanged = async (sender, value) => {
        function updateConfig(config) {
            config.value = value;
        }
        console.log('textchanged', value);
        this.saveData(sender.props.config.key, updateConfig);
    }
    section(item, parentIndex) {
        // console.log('section', item, parentIndex);
        let key = `${item.key}${this.state.key}`;
        console.log(key);
        switch (item.type) {
            case 'label':
                console.log("11");
                return <Label key={key} config={item} />;
            case 'text':
                return <Text key={key} config={item} onChange={this.onTextChanged} />;
            case 'number':
                return <Number key={key} config={item} onChange={this.onTextChanged} />;
            case 'password':
                return <Text key={key} type='password' config={item} onChange={this.onTextChanged} />;
            case 'date':
                return <Date key={key} config={item} onChange={this.dateChanged} />;
            case 'toggle':
                return <Toggle key={key} onChange={this.toggleChanged} config={item} />;
        }
    }

    render() {
        return (
            this.state.configs.map((item, index) => {
                // return <Text key={item.key} config={item} />;

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
                        <Col span={10}>
                            <span>
                                {this.section(item, index)}
                                {/* {this.state.config.value} */}
                            </span>
                        </Col>
                    </Row>
                </div>
            })
        );
    }
}