import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Room from './components/Room';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/room' element={<Room />} />
      </Routes>
    </>
  )
}

export default App