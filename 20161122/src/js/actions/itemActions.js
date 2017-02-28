import Reflux from 'reflux';
import config from './../config.js';


const ItemActions = Reflux.createActions({
  'loadItems': {children: ['completed', 'failed']}
});

const LiActions = Reflux.createActions({
  'loadItems': {children: ['completed', 'failed']}
});

ItemActions.loadItems.listen(function(){
  fetch(config.url1).then(response => response.json())
  			.then(data => {
  				console.log(data);
  				const items = data.list;
    			this.completed(items);
  			})
  			.catch(e => console.log("请求服务器出错！", e))
});

LiActions.loadItems.listen(function(){
  fetch(config.url2).then(response => response.json())
  			.then(data => {
  				console.log(data);
  				// const items = data.list;
    		// 	this.completed(items);
  			})
  			.catch(e => console.log("请求服务器出错！", e))
});

export default {
	ItemActions,
	LiActions
}
