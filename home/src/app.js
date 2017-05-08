import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import router from './js/router';
import './css/main.scss';
window.$ = $;

ReactDOM.render(router, document.getElementById('app'));
