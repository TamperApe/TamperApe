import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import { Layout, Icon } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SideMenu from './SideMenu';
import { TaskList } from './TaskList';
import { Setting } from './Setting';
import { ScriptList } from './ScriptList';
import { ScriptInfo } from './ScriptInfo';

const { Header, Content } = Layout;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <p>
      <a target="_blank" href="https://github.com/TamperApe/TamperApe">Github</a>
    </p>
    <p>
      <a target="_blank" href="https://github.com/TamperApe/TamperApe/blob/master/src/userscripts/api.js">API定义</a>
    </p>
    <p>
      <a target="_blank" href="https://github.com/TamperApe/TamperApe/tree/master/examples">样例</a>
    </p>
  </div>
);

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class App extends Component {
  constructor(props) {
    super(props);

    this.content = React.createRef();
  }
  state = {
    collapsed: false,
    contentHeight: 100,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  //界面加载成功
  async componentDidMount() {
    let contentElement = ReactDom.findDOMNode(this.content.current);
    //这里不wait，高度不正确，不清楚是打包的bug还是react的bug
    await timeout(0);
    // let { clientHeight } = contentElement;
    let { height, padding, marginTop, marginBottom } = window.getComputedStyle(contentElement, null);
    // alert(padding.replace('px', ''));
    // alert(clientHeight);
    // alert(this.state.contentHeight);
    // marginTop = marginTop.replace('px', '');
    // marginBottom = marginBottom.replace('px', '');
    height = height.replace('px', '');
    padding = padding.replace('px', '');
    // let temp = height - padding * 2;
    // alert(temp);
    this.setState({
      contentHeight: height - padding * 2
    });
    // this.state.contentHeight = clientHeight;
    // alert(this.state.contentHeight);
  }
  render() {
    return (
      <Router>
        <Layout>
          <SideMenu toggle={() => this.toggle} collapsed={this.state.collapsed} />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content ref={this.content} style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              <Switch>
                <Route exact={true} path="/" render={() => <Redirect to="/ScriptList" />} />
                <Route path="/Setting" render={() => <Setting />} />
                <Route path="/TaskList" render={() => <TaskList height={this.state.contentHeight} />} />
                <Route path="/ScriptList" render={() => <ScriptList height={this.state.contentHeight} />} />
                <Route path="/About" render={() => <About />} />
                <Route path="/ScriptInfo/:name" render={(props) => <ScriptInfo  {...props} />} />
                {/* <Route path="/ScriptInfo/:name/:tabKey" render={(props) => <ScriptInfo  {...props} />} /> */}
                {/* <Route path="/ScriptInfo/:topicId" render={() => <ScriptInfo />} /> */}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
