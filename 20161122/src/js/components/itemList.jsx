import React from 'react';

const ItemList = (props) => {
    props.items.map(item => console.log(item));
    let items = props.items.map(item => <li className="item-li" key={ item.id }>

        <a href={item.id}><img className="item-img" src={item.imgurl} />{ item.title }</a>
        </li>),
      loading = props.loading ? <div className="loading-label">Loading...</div> : '';

    return (
      <div>
        {loading}
        <ul className="item-ul">
          {items}
        </ul>
      </div>
    );                               
};

ItemList.propTypes = {
  loading : React.PropTypes.bool,
  items : React.PropTypes.array
}

export default ItemList;