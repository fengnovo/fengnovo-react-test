import React from 'react'
export default class UserDetail extends React.Component{
    render(){
        let {match} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    ID:{match.params.id}
                    姓名:
                </div>
            </div>
        )
    }
}