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

import { UserManagerData } from '../mock'

import '../styles/userManagerRightSlideContent.scss';


class UserManagerRightSlideContent extends React.Component {
    constructor(...args){
        super(...args)
    }

    render() {
        return <div className="yzt-usermanager-rscontent">
           <div className="rscontent-title">资质详情</div>
           <div className="rscontent-content">
                <div className="rscontent-content-item">
                    <div className="rscontent-content-item-title">
                        基本信息
                    </div>
                    <div className="rscontent-content-item-content">
                        <div>
                            <table>
                                <tr>
                                    <td>所属行业</td>
                                    <td>所属行业所属行业所属行业</td>
                                </tr>
                                <tr>
                                    <td>推广内容</td>
                                    <td>推广内容推广内容推广内容</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="rscontent-content-item">
                    <div className="rscontent-content-item-title">
                        营业执照
                    </div>
                    <div className="rscontent-content-item-content">
                        <div>
                            <table>
                                <tr>
                                    <td>公司名称</td>
                                    <td>所属行业所属行业所公司</td>
                                </tr>
                                <tr>
                                    <td>推广内容</td>
                                    <td>推广内容推广内容推广内容</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="rscontent-content-item">
                    <div className="rscontent-content-item-title">
                        组织机构代码
                    </div>
                    <div className="rscontent-content-item-content">
                        <div>
                            <table>
                                <tr>
                                    <td>组织机构代码</td>
                                    <td>56562987445</td>
                                </tr>
                                <tr>
                                    <td>组织机构代码副本</td>
                                    <td>推广内容推广内容推广内容</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="rscontent-content-item">
                    <div className="rscontent-content-item-title">
                        开户行许可证
                    </div>
                    <div className="rscontent-content-item-content">
                        <div>
                            <table>
                                <tr>
                                    <td>银行开户名</td>
                                    <td>北京银行</td>
                                </tr>
                                <tr>
                                    <td>公司银行账户</td>
                                    <td>4982556184555-4455</td>
                                </tr>
                                <tr>
                                    <td>开户银行支行名</td>
                                    <td>北京银行五环支行</td>
                                </tr>
                                <tr>
                                    <td>开户银行支行联行号</td>
                                    <td>21495558446</td>
                                </tr>
                                <tr>
                                    <td>开户银行支行地址</td>
                                    <td>北京市五环高速路口</td>
                                </tr>
                                <tr>
                                    <td>银行开户许可证电子版</td>
                                    <td>
                                        <div>
                                        
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
           </div> 
        </div>
    }
}

export default UserManagerRightSlideContent