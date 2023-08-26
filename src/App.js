import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Callback from './home/Callback';
import { AuthProvider } from './context/AuthContext';
import Project from './project/Poject';
import Login from './home/Login';
import OAuth2Redirect from './home/OAuth2Redirect';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/project' element={<Project/>}/>
          <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}





export default App;


