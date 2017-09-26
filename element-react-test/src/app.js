import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers';

import 'element-theme-default';

import './styles/app.scss';

ReactDOM.render(<AppRouter/>, document.getElementById('app'));