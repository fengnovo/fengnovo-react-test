import React from 'react';
import ItemList from '../components/itemList.jsx';
import {
  ItemStore,
  LiStore
} from '../stores/itemStore';
import {
  ItemActions,
  LiActions
} from '../actions/itemActions';

class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      items : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
    ItemActions.loadItems();
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
        <ItemList { ...this.state } />
      </div>
    );
  }
}

export default Home;