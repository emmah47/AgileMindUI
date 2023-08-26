// src/components/GithubLogin.js
import React from 'react';
import axios from 'axios';

const GithubLogin = () => {
  const handleLogin = ()=>{

    window.location.href = `http://localhost:8080/oauth2/authorization/github?redirect_uri=http://localhost:3000/callback`;

  }

  return (
    <div>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default GithubLogin;
