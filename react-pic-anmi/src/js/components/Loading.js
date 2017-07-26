import React from 'react'

class Loading extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const {r,z,c} = this.props
        let wrap = {'width': r+'px','height':r+'px'}
        // let layout = {
        //     'position': 'absolute',
        //     'top': 0,
        //     'left': 0,
        //     'border': '4px solid #F88E8B',
        //     'borderRadius': '50%',        
        //     'width': (r-(2*z)) + 'px',
        //     'height': (r-(2*z)) + 'px',
        //     'border': z+'px solid #F88E8B',
        //     'borderBottom': z+'px solid transparent'
        // }

        let ll = {
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': (r-(2*z)) + 'px',
                'height': (r-(2*z)) + 'px',
                'borderWidth': z+'px ',
                'borderStyle': 'solid',
                'borderColor': c,
                'borderRadius': '50%',        
                'borderLeft': z+'px solid transparent',
                'borderBottom': z+'px solid transparent',
                'transform': 'rotate(40deg)',
                'animation': 'animation-circle-left 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }
        let lr = {
                'position': 'absolute',
                'top': 0,
                'right': 0,
                'width': (r-(2*z)) + 'px',
                'height': (r-(2*z)) + 'px',
                'borderWidth': z+'px ',
                'borderStyle': 'solid',
                'borderColor': c,
                'borderRadius': '50%',        
                'borderRight': z+'px solid transparent',
                'borderBottom': z+'px solid transparent',
                'transform': 'rotate(-310deg)',
                'animation': 'animation-circle-right 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }

        // console.log('ll',ll)
        // console.log('lr',lr)

        return (
            <div className="loading">
                <div className="wrap" style={wrap}>
                    <div className="circle-layout" style={wrap}>
                        <div className="layout-left">
                            <div className="circle-left" style={ll}></div>
                        </div>
                        <div className="layout-right">
                            <div className="circle-right" style={lr}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // render() {
    //     return (
    //     <div className="loading">
    //         <div className="wrap">
    //             <div className="circle-layout">
    //                 <div className="layout-left">
    //                     <div className="circle-left"></div>
    //                 </div>
    //                 <div className="layout-right">
    //                     <div className="circle-right"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //      )
    // }
}
export default Loading
