import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Home from './components/home/Home'
import Login from './components/login/Login'
import OAuth2Redirect from './components/login/OAuth2Redirect'
import Project from './api/Project'


import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
            <Route path='/projects' element={<Project />} />
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
