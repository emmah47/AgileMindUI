// src/components/GithubLogin.js
import React from 'react';
import axios from 'axios';

const LoginButton = () => {
  const handleLogin = ()=>{

    window.location.href = `http://localhost:8080/greeting`;

  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginButton;