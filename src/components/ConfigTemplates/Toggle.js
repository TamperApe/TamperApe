import React, { Component } from 'react';
import { Switch, Row, Col, Input } from 'antd';
import ReactDom from 'react-dom';

export class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.config.value,
        }
        // console.log("toggle", props.checked);
    }

    componentDidMount() {
        // console.log("toggle1", this.props.checked);
    }

    toggleChanged = (e) => {
        this.setState({
            checked: e
        });
        this.props.onChange(this, e);
    }

    render() {
        return (
            <Switch
                value={this.state.checked}
                onChange={this.toggleChanged} checked={this.state.checked} />
        );
    }
}
