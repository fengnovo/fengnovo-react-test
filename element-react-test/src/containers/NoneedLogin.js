import React from 'react'
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

import { mockData } from '../mock'

class NoneedLogin extends React.Component {
    constructor(...args){
        super(...args)
        this.state = mockData
    }

    onOpen() {

    }

    onClose() {

    }

    onSubmit() {

    }

    onChange() {

    }

    rowClassName(row, index) {
        if (index%2 === 0) {
            return '';
        } else{
            return 'yzt-table-bg';
        }
    }
    render() {
        return <div className="yzt-container">
                    <p className="content-nav-title">
                        <span>免登录查询</span>
                    </p>
                    <div className="yzt-container-content">
                    <Form inline={true} model={this.state.form} onSubmit={this.onSubmit.bind(this)} className="demo-form-inline">
                        
                        <Form.Item>
                            <div className="yzt-form-item-input">
                            <Input  value={this.state.form.user} 
                                    placeholder="输入广告主pin查询" 
                                    onChange={this.onChange.bind(this, 'user')}
                                    className="yzt-form-item-btn-one"
                                    ></Input>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button nativeType="submit" type="primary" className="yzt-form-item-btn-one">查询</Button>
                        </Form.Item>
                    </Form>
                    
                </div>
            </div>
    }
}

export default NoneedLogin