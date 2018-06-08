import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Button, Row, Col, Tabs, Table, DatePicker, InputNumber } from 'antd';
import './TaskList.css';
import { HashRouter as Router, Link } from 'react-router-dom';
import { EditableCell } from './EditableCell'
import moment from 'moment';
import { ConfigItem } from './ConfigTemplates/ConfigItem'
import { HashRouter as Route } from 'react-router-dom';
import ScriptsManager from '../lib/ScriptsManager';
// import queryString from 'query-string';

const TabPane = Tabs.TabPane;
const Storager = require('../lib/Storager');

export class ScriptInfo extends Component {
    constructor(props) {
        super(props);
        //初始化state
        //console.log("ScriptINfo");
        let name = this.props.match.params.name;
        // let tabKey = this.props.match.params.tabKey;
        const panes = [];
        this.state = {
            name: name,
            tabKey: "0",
            panes
        }
        this.onTbChange = this.onTbChange.bind(this);
        this.loadData();
    }

    async loadData() {
        console.log("load data");
        let key = await Storager.getStorage(`${this.state.name}.tabKey`);
        if (!key)
            key = 0;

        var sdata = await ScriptsManager.getScriptList();
        // var sdata = await Storager.getStorage("ScriptList", true, []);
        if (!sdata)
            return;
        let target = sdata.filter((item) => item.name === this.state.name);
        if (!target || target.length < 1)
            return;
        target = target[0];

        let panes = target.configTaps;
        for (const paneItem of panes) {
            let tempArray = [];
            for (const configItem of target.configs) {
                if (!configItem.tapKey)
                    configItem.tapKey = 0;

                if (configItem.tapKey === paneItem.key)
                    tempArray.push(configItem);
            }

            paneItem.configs = tempArray;
        }
        this.setState({
            panes: panes,
            tabKey: key
        });
    }

    //界面加载成功
    async componentDidMount() {

    }

    async onTbChange(key) {
        console.log("changed");
        await Storager.setStorage(`${this.state.name}.tabKey`, key)
        this.setState({
            tabKey: key
        });
    }

    render() {
        // let params = queryString.parse(this.props.location.search);
        const scriptName = this.state.name;
        const currentUrl = this.props.match.url.slice(0, -2);
        console.log(this.state.panes);
        return (
            <div>
                <Row type="flex" justify="start" align="middle">
                    <Col span={21}>
                        {scriptName}
                    </Col>
                    <Col >
                        <Button>清除配置</Button>
                    </Col>
                </Row>
                {/* defaultActiveKey={this.state.tabKey} */}

                <Tabs
                    activeKey={this.state.tabKey}
                    onChange={this.onTbChange}
                    style={{ minheight: 220 }}>
                    {this.state.panes.map((pane, paneKey) =>
                        // tab={<Link to={`${currentUrl}/${pane.key}`}>{pane.title}</Link>}
                        <TabPane tab={pane.title} key={pane.key}>
                            <ConfigItem scriptName={scriptName} configs={pane.configs} />
                        </TabPane>)}
                </Tabs>
            </div>
            // `this${params}`
        );
    }
}