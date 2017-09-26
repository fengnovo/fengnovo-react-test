import React from 'react'
import { 
    Button,
    Notification
} from 'element-react'


class AlertTip extends React.Component {
    constructor(...args){
        super(...args)
    }

    onClick() {
        MessageBox.msgbox({
            title: '消息',
            message: '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
            showCancelButton: true
        }).then(action => {
            Message({
            type: 'info',
            message: 'action: ' + action
            });
        })
    }

    render() {
        return <Button type="text" onClick={this.onClick.bind(this)}>点击打开 Message Box</Button>
    }
}

export default AlertTip