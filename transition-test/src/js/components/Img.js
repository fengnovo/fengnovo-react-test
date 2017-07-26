import React from 'react';
 
class Img extends React.Component {
  constructor(props) {
    super(props);
    let { 
      imageUrl,
      defaultImg,
      w,
      h
    } = this.props
    this.state = { 
      imageUrl,
      defaultImg,
      w,
      h
    }
  }
 
  handleImageLoaded() {

  }
 
  handleImageErrored() {
    this.setState({ 
      imageUrl: this.state.defaultImg,
    });
  }
 
  render() {
    const { 
      imageUrl,
      defaultImg,
      w,
      h
    } = this.state
    let style = {
      'width': w,
      'height': h,
      'background': 'url('+defaultImg+') no-repeat',
      'backgroundPosition': 'center center',
      'backgroundSize': 'contain',
      'display': 'inline'
    }
    let sty = {
        'width': w,
        'height': h,
    }
    return (
      <div style={style}>
        <img
          style={sty}
          src={imageUrl}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          />
      </div>
    );
  }
}
export default Img;