import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Room from './components/Room';
import { StreamCall } from '@stream-io/video-react-sdk';
import { useUser } from './components/UserContext';

const App = () => {
  const { call } = useUser();
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/room' element={call ? <StreamCall call={call}><Room /></StreamCall> : <Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App