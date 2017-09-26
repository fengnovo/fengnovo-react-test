import React from 'react'
import {
  Router,
  Route,
  Link
} from 'react-router-dom'

import createHistory    from 'history/createHashHistory'
const history = createHistory()

import { 
    Layout,
    Menu,
    Breadcrumb,
    Table,Form,
    DateRangePicker,
    Button,
    Select,
    Input,
    Pagination  
} from 'element-react'

import UserManager      from '../containers/UserManager'
import MsgReceived      from '../containers/MsgReceived'
import AdsVerify        from '../containers/AdsVerify'
import MaterialRank     from '../containers/MaterialRank'
import NoneedLogin      from '../containers/NoneedLogin'
import FinancialQuery   from '../containers/FinancialQuery'
import TaxQuery         from '../containers/TaxQuery'


class AppRouter extends React.Component {
    constructor(...args){
        super(...args)
        
        if(this.props.match){
           console.log(this.props.match)
        }
        this.state = {
            tabId: "1"
        }

        this.onOpen = this.onOpen.bind(this)
        this.onClose = this.onClose.bind(this)
        this.changeTab = this.changeTab.bind(this)
    }

    componentWillMount() {
       
    }

    onOpen() {

    }
        
    onClose() {

    }

    changeTab(tabId) {
        this.setState({ tabId })
    }

    render() {
        return <Router history={history}>
            <div className="boss-yzt">
                        <Layout.Row className="yzt-nav">
                            <Layout.Col span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
                        </Layout.Row>
                        <Layout.Row className="tac">
                            <Layout.Col span={3} className="yzt-left">
                                <Menu defaultActive={this.state.tabId} className="item-gb-black" onOpen={this.onOpen} onClose={this.onClose}>
                                    <Link to="/userManager" onClick={()=>this.changeTab("1")}>
                                        <Menu.Item index="1" className="item-gb-black"><i className="el-icon-menu"></i>用户管理</Menu.Item>
                                    </Link>
                                    <Link to="/msgReceived" onClick={()=>this.changeTab("2")}>
                                        <Menu.Item index="2" className="item-gb-black"><i className="el-icon-setting"></i>消息触达</Menu.Item>
                                    </Link>
                                    <Link to="/adsVerify" onClick={()=>this.changeTab("3")}>  
                                        <Menu.Item index="3" className="item-gb-black"><i className="el-icon-setting"></i>广告审核</Menu.Item>
                                    </Link>
                                    <Link to="/materialRank" onClick={()=>this.changeTab("4")}>
                                        <Menu.Item index="4" className="item-gb-black"><i className="el-icon-setting"></i>素材排行</Menu.Item>
                                    </Link>
                                    <Link to="/noneedLogin" onClick={()=>this.changeTab("5")}>
                                        <Menu.Item index="5" className="item-gb-black"><i className="el-icon-setting"></i>免登陆查询</Menu.Item>
                                    </Link>
                                    <Menu.SubMenu index="6"
                                            title={<span><i className="el-icon-message" ></i>财税查询</span>}>
                                        <Link to="/financialQuery" onClick={()=>this.changeTab("7")}>
                                            <Menu.Item index="7 " className="item-gb-black">财务查询</Menu.Item>
                                        </Link>
                                        <Link to="/taxQuery" onClick={()=>this.changeTab("8")}>
                                            <Menu.Item index="8" className="item-gb-black">税务查询</Menu.Item>
                                        </Link>
                                    </Menu.SubMenu>
                                </Menu>
                            </Layout.Col>
                            <Layout.Col span={21} className="yzt-right">
                                <Route exact path="/"           component={UserManager}/>
                                <Route path="/userManager"      component={UserManager}/>
                                <Route path="/msgReceived"      component={MsgReceived}/>
                                <Route path="/adsVerify"        component={AdsVerify}/>
                                <Route path="/materialRank"     component={MaterialRank}/>
                                <Route path="/noneedLogin"      component={NoneedLogin}/>
                                <Route path="/financialQuery"   component={FinancialQuery}/>
                                <Route path="/taxQuery"         component={TaxQuery}/>
                            </Layout.Col>
                        </Layout.Row>
                    </div>
        </Router>
    }
}

export default AppRouter