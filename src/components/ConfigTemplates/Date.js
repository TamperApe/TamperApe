import React, { Component } from 'react';
import { DatePicker, Row, Col, Input } from 'antd';
import ReactDom from 'react-dom';
import moment from 'moment';

export class Date extends React.Component {
    constructor(props) {
        super(props);
        let date;
        // console.log('date', props.config.value, moment(JSON.parse(props.config.value)));
        if (props.config.value)
            date = moment(props.config.value);

        this.state = {
            date: date,
            // date: props.config.value,
        }
    }

    onDateChange = async (date, dateString) => {
        console.log('dateChanged');
        if (date)
            date = moment(date);
        this.setState({
            date: date,
        });
        this.props.onChange(this, dateString);
    }

    render() {
        return (
            <DatePicker
                onChange={this.onDateChange} value={this.state.date} />
        );
    }
}
