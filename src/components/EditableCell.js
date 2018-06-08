import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './EditableCell.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        // this.inputTxt = React.createRef();

    }
    inputTxt = element => {
        if (!element) return;
        let inputElement = ReactDom.findDOMNode(element);
        inputElement.select();
    };
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        var isInt = parseInt(value, 10).toString() === value;
        if (!isInt)
            return;

        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    componentDidMount() {
        // alert(3);
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            {/* ref={input => {
                                    if (!input) return;
                                    //input.focus()
                                  
                                    let inputElement = ReactDom.findDOMNode(input);
                                    inputElement.select();
                                }} */}
                            <Input
                                ref={this.inputTxt}
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}
