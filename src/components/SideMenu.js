import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
    render() {
        const { location } = this.props;
        return (
            <Sider
                trigger={() => this.props.toggle()}
                collapsed={this.props.collapsed}>
                <div className="logo" >Tamper Ape</div>
                <Router>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/ScriptList']} selectedKeys={[location.pathname]}>
                        {/* <Menu.Item key="/Setting">
                            <Link to="/Setting">
                                <Icon type="setting" />
                                <span>设置</span>
                            </Link>
                        </Menu.Item> */}                       
                        <Menu.Item key="/ScriptList">
                            <Link to="/ScriptList">
                                <Icon type="folder" />
                                <span>脚本管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/About">
                            <Link to="/About">
                                <Icon type="exclamation-circle-o" />
                                <span>关于</span>
                            </Link>
                        </Menu.Item>
                        {/* <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="4">Tom</Menu.Item>
                            <Menu.Item key="5">Bill</Menu.Item>
                            <Menu.Item key="6">Alex</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </Router>
            </Sider>
        );
    }
}
export default withRouter(SideMenu)