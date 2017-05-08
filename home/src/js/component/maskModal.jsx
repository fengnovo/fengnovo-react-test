import React from 'react';

class MaskModal extends React.Component {
    constructor(props){
        super(props);

        this._bind.apply(this, ['closeModal']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    closeModal () {
        this.props.closeModal();
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        let {title='提示', text=''} = this.props;

        return (
            <section className='modal-mask'>
                <div className='mask'></div>
                <div className='modal-body'>
                    <div className='content'>
                        <h5 className='title'><i className='warn'></i>{title}</h5>
                        <p className='text'>{text}</p>
                    </div>
                    <div className='footer' onClick={this.closeModal}>知道了</div>
                </div>
            </section>
        );
    }
};

export default MaskModal;

