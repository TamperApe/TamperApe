import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import ReactDom from 'react-dom';

export class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.config.value,
            type: props.type
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.onChange(this, e.target.value);
    }

    blur = () => {
    }
    pressEnter = () => {
    }
    check = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <Input
                onBlur={this.blur}
                value={this.state.value}
                type={this.state.type}
                onChange={this.handleChange}
                onPressEnter={this.pressEnter}
            />
        );
    }
}
