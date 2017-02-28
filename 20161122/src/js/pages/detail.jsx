import React from 'react';
import {
  ItemStore,
  LiStore
} from '../stores/itemStore';
import {
  ItemActions,
  LiActions
} from '../actions/itemActions';


class Detail extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      items : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = LiStore.listen(this.onStatusChange.bind(this));
    LiActions.loadItems();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="content">
        <div></div>
      </div>
    );
  }
}

export default Detail;