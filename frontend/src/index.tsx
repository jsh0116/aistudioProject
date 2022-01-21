import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './modules';
// configureStore를 통한 store 생성 (reduxjs toolkit)

// import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// 기존 createStore통한 store 생성 (middleware 추가해야하는 번거로움)
// const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
