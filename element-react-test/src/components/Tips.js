import React from 'react'
import { 
    Button,
    Notification
} from 'element-react'


class Tips extends React.Component {
    constructor(...args){
        super(...args)
    }

    open3() {
        Notification({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
        });
    }

    open4() {
        Notification({
            title: '警告',
            message: '这是一条警告的提示消息',
            type: 'warning'
        });
    }

    open5() {
        Notification.info({
            title: '消息',
            message: '这是一条消息的提示消息'
        });
    }

    open6() {
        Notification.error({
            title: '错误',
            message: '这是一条错误的提示消息'
        });
    }

    render() {
        return <div>
            <Button plain={true} onClick={this.open3.bind(this)}>成功</Button>
            <Button plain={true} onClick={this.open4.bind(this)}>警告</Button>
            <Button plain={true} onClick={this.open5.bind(this)}>消息</Button>
            <Button plain={true} onClick={this.open6.bind(this)}>错误</Button>
        </div>
    }
}

export default Tips