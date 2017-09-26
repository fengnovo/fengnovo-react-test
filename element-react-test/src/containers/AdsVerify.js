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

class AdsVerify extends React.Component {
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
                        <span>广告审核</span>
                    </p>
                    <div className="yzt-container-content">
                    <Form inline={true} model={this.state.form} onSubmit={this.onSubmit.bind(this)} className="demo-form-inline">
                        <Form.Item>
                            <Button nativeType="submit" type="primary" className="yzt-form-item-btn">下载Excel</Button>
                        </Form.Item>
                        <Form.Item className="yzt-form-item">
                            <DateRangePicker className="yzt-form-item"
                                value={this.state.value1}
                                placeholder="选择日期范围"
                                onChange={date=>{
                                    console.debug('DateRangePicker1 changed: ', date)
                                    this.setState({value1: date})
                                }}
                                />
                            <Select value={this.state.form.region} placeholder="选择交易类型" className="yzt-form-item-sel">
                                <Select.Option label="区域一" value="shanghai"></Select.Option>
                                <Select.Option label="区域二" value="beijing"></Select.Option>
                            </Select>
                            <Select value={this.state.form.region} placeholder="选择交易状态"  className="yzt-form-item-sel">
                                <Select.Option label="区域一" value="shanghai"></Select.Option>
                                <Select.Option label="区域二" value="beijing"></Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <div className="yzt-form-item-input">
                            <Input  value={this.state.form.user} 
                                    prepend="GdtUid"
                                    placeholder="输入PIN/伪uin/GdtUid" 
                                    onChange={this.onChange.bind(this, 'user')}
                                    className="yzt-form-item-btn-one"
                                    ></Input>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button nativeType="submit" type="primary" className="yzt-form-item-btn-one">查询</Button>
                        </Form.Item>
                    </Form>
                    <Table className="yzt-table"
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.data}
                        rowClassName={this.rowClassName.bind(this)}
                        onSelectChange={(dataItem, checked)=>{console.log(dataItem, checked)}}
                        onSelectAll={(dataList, checked)=>{console.log(dataList, checked);}}
                        />
                    <div className="yzt-page">
                        <Pagination layout="prev, pager, next" total={1000} small={true}/>
                    </div>
                </div>
            </div>
    }
}

export default AdsVerify