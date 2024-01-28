import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Login from './components/login/Login'
import OAuth2Redirect from './components/login/OAuth2Redirect'

import Home from './components/home/Home'
import UserProfile from './components/home/profile/UserProfile'

import Project from './components/project/Project'

import './App.css'

function App() {

  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
              <Route path='/projects' element={<Project />} />
              <Route path="*" element={<Navigate to="/" />}/>
              <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>}/>
              <Route path='/project/:id' element={<PrivateRoute><Project /></PrivateRoute>}/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
