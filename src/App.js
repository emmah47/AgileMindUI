import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GithubLogin from './components/GithubLogin';
import Callback from './components/Callback';
import LoginButton from './components/TestLogin';
import MessageDisplay from './components/MessageDisplay';


function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/callback' element={<Callback />} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
  );
}

function Login() {
  const [message, setMessage] = useState("Hello");

  function handleClick() {
    if (message == "Hello") {
      setMessage("Goodbye")
    } else {
      setMessage("Hello")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyButton message={message} onClick={handleClick}/>
        <p>
          Edit <code>src/App.js</code> and save to.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          BEAN
        </a>
        <GithubLogin />
      </header>
    </div>
  );
}

function MyButton({ message, onClick }) {
  return (
    <button onClick={onClick}>
      {message} World!
    </button>
  );
}



export default App;


