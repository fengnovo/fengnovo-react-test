import React from 'react'
import {Prompt} from 'react-router-dom'
export default class UserAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {blocking: false};
    }

    handleChange = (event) => {
        this.setState({
            blocking: event.target.value && event.target.value.length > 0
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            blocking: false
        }, () => {
            this.props.history.push('/user/list');
        });

    }

    render() {
        return (
            <div>
                <Prompt
                    when={this.state.blocking}
                    message={location => (
                        `你确定你要去 ${location.pathname} 吗?`
                    )}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input ref={(ref) => this.name = ref} type="text" onChange={this.handleChange}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">提交</button>
                    </div>
                </form>
            </div>
        )
    }
}