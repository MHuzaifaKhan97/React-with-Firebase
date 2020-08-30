import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {Provider} from 'react-redux';
// import store from './store';
import { Provider } from 'mobx-react';
import store from './stores';

ReactDOM.render(
  <Provider {...store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

