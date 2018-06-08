import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ReactDom from 'react-dom';

export class Label extends React.Component {
    constructor(props) {
        super(props);
        // console.log("label");
        this.state = {
            config: props.config,
        };
    }

    render() {
        let value = this.state.config.value;
        if (this.state.config.format === 'timestamp') {
            if (this.state.config.value)
                value = new Date(this.state.config.value);
        }
        return (
            // <Row type="flex" justify="start">
            //     <Col span={2}>
            //         <span>
            //             {this.state.config.desc}
            //         </span>
            //     </Col>
            //     <Col span={1}>
            //         <span>
            //             :
            //         </span>
            //     </Col>
            //     <Col span={8}>
            <span>
                {value + ""}
            </span>
            // </Col>
            // </Row >
        );
    }
}
