import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store/store'
import './scss/style.scss';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('reactapp')
);
