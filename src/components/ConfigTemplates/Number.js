import React, { Component } from 'react';
import { InputNumber, Row, Col, Input } from 'antd';
import ReactDom from 'react-dom';

export class Number extends React.Component {
    constructor(props) {
        console.log("number");
        super(props);
        this.state = {
            value: props.config.value,
            type: props.type
        }
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
        this.props.onChange(this, value);
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
            <InputNumber
                value={this.state.value}
                type={this.state.type}
                onChange={this.handleChange}
                onPressEnter={this.pressEnter}
            />
        );
    }
}
