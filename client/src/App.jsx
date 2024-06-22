import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/sign-in' element={<Main />} />
        <Route path='/room' element={<Main />} />
      </Routes>
    </>
  )
}

export default App