import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Home from './components/home/Home'
import Login from './components/login/Login'
import OAuth2Redirect from './components/login/OAuth2Redirect'
import Project from './api/Project'
import UserProfile from './components/home/profile/UserProfile'

import Sprint from './components/projectdashboard/sprint/Sprint'
import Backlog from './components/projectdashboard/backlog/Backlog'
import Timeline from './components/projectdashboard/timeline/Timeline'
import Report from './components/projectdashboard/report/Report'
import WhiteBoard from './components/projectdashboard/whiteboard/Whiteboard'
import Settings from './components/projectdashboard/settings/Settings'



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
            <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>}/>
            <Route path='/project/:id/sprint' element={<PrivateRoute><Sprint /></PrivateRoute>}/>
            <Route path='/project/:id/backlog' element={<PrivateRoute><Backlog /></PrivateRoute>}/>
            <Route path='/project/:id/timeline' element={<PrivateRoute><Timeline /></PrivateRoute>}/>
            <Route path='/project/:id/report' element={<PrivateRoute><Report /></PrivateRoute>}/>
            <Route path='/project/:id/whiteboard' element={<PrivateRoute><WhiteBoard /></PrivateRoute>}/>
            <Route path='/project/:id/settings' element={<PrivateRoute><Settings /></PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
