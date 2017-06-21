import React from 'react'
import {withRouter} from 'react-router-dom'
class   Login extends React.Component{
    render(){
        let {history,location} = this.props;
        return (
            <div>
                <button className="btn btn-primary" onClick={()=>{
                    localStorage.setItem('login','true');
                    history.push(location.state.from.pathname);
                }}>登录</button>
            </div>
        )
    }
}
export default  withRouter(Login)