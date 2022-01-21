import React from 'react';
// import { Provider } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './header';
import Admin from './admin';
import { store } from '../modules';

function Main() {
  return (
    <>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path="/admin" element={<Admin />}/>
        </Routes>
      </Provider>
    </>
  )
}

export default Main;