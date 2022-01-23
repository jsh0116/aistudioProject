import React from 'react';
// import { Provider } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './header';
import Admin from './admin';
import Board from './board';
import BoardWrite from './board-write';
import BoardContent from './board-content';
import { store } from '../modules';

function Main() {
  return (
    <>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path='/board' element={<Board />}/>
          <Route path='/board_write' element={<BoardWrite />}/>
          <Route path='/board_content' element={<BoardContent />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path='/' element={<Board />}/>
        </Routes>
      </Provider>
    </>
  )
}

export default Main;