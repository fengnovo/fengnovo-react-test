import React, { Component } from 'react';
import E from 'wangeditor'

class Editor extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
      }
      this.editor = {}
  }
  render() {
    return (
        <div ref="editorElem" style={{textAlign: 'left'}}>
      	</div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    this.editor = new E(elem)
    this.editor.customConfig.uploadImgShowBase64 = true
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    // editor.customConfig.onchange = html => {
    //   this.setState({
    //     editorContent: html
    //   })
    // }

    this.editor.create()
  }
  clickHandle() {
      // this.props.publishTopic(this.state.editorContent)
      this.props.publishTopic(this.editor.txt.text())
      console.log(this.editor.txt.text())
  }
}

export default Editor