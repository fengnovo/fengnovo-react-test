import React from 'react';
import Img from '../components/Img'
import defaultImg from '../../imgs/cnodejs.png'
 
class Home extends React.Component {
  render() {
    return (
      <Img  imageUrl="http://img0.imgtn.bdimg.com/it/u=783sdfgdfgdfsgd060973,4278100629&fm=26&gp=0adsfsdfge.jpg"
            defaultImg={defaultImg}
            w='5rem'
            h='4rem'
      />  
    );
  }
}
export default Home;