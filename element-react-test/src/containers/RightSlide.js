import React from 'react'

import { mockData } from '../mock';
import $ from 'jquery';

import '../styles/rightSlide.scss';

class RightSlide extends React.Component {
    constructor(...args){
        super(...args)
        this.state = mockData
        this.trigger = this.trigger.bind(this)
    }

    componentDidMount() {
        $('.close-btn').on('click',function(){  
            console.log('1')
            if(!$('.sidebar').hasClass('slideLeft'))  
            {  
                $('.div-pop').show()
                $('.close-btn').show()
                $('.sidebar').addClass('slideLeft').removeClass('slideRight')
            }  
            else  
            {  
                $('.div-pop').hide()
                $('.close-btn').hide()
                $('.sidebar').removeClass('slideLeft').addClass('slideRight')
            }  
        }); 
        $('.div-pop').on('click',function(){ 
            console.log('0')
            $('.div-pop').hide()
            $('.close-btn').hide()
            $('.sidebar').removeClass('slideLeft').addClass('slideRight')  
        });
    }

    trigger() {
        console.log('1')
        if(!$('.sidebar').hasClass('slideLeft'))  
        {  
            $('.div-pop').show()
            $('.close-btn').show()
            $('.sidebar').addClass('slideLeft').removeClass('slideRight')
        }  
        else  
        {  
            $('.div-pop').hide()
            $('.close-btn').hide()
            $('.sidebar').removeClass('slideLeft').addClass('slideRight')
        }  
    }
    
    render() {
        return <div className="boss-yzt-right-slide">
                    <div className="sidebar">
                    <div className="sidebar-left">  
                        <div className="close-btn sidebar-pull-button">  
                            关闭 
                        </div>  
                    </div>  
                    <div className="rs-bg sidebar-right">  
                        { this.props.children }    
                    </div>  
                </div> 
                <div className="div-pop"></div>
        </div>
    }
}

export default RightSlide