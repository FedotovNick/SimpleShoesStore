import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('reactapp')
);

  id1.classList.remove('m-appear');
  id2.classList.remove('m-appear');
  id3.classList.remove('m-appear');
  id5.classList.remove('m-appear');
  id6.classList.remove('m-appear');


  let bool1 = true;
  let bool2 = true;
  let bool3 = true;
  let bool4 = true;

  window.addEventListener('scroll', (e)=>{

    let wch = document.documentElement.clientHeight;
      
    if(bool1 && (id1.getBoundingClientRect().top <= wch)) {bool1=false; id1.classList.add('m-appear')}
    if(bool2 && (id2.getBoundingClientRect().top <= wch)) {bool2=false; id2.classList.add('m-appear')}
    if(bool3 && (id3.getBoundingClientRect().top <= wch)) {bool3=false; id3.classList.add('m-appear')}
    if(bool4 && (id5.getBoundingClientRect().top <= wch)) {bool4=false; id5.classList.add('m-appear'); id6.classList.add('m-appear')}

  });
