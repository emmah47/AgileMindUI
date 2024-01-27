import logo from "../../images/logo.png"

import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";

import "./Login.css"


function Login() {
  return (
    <div className="login-page">
      <div className="login-panel-wrapper">
        <div className="login-logo-container">
          <img className="login-page-logo" src={logo}/>
        </div>
        <div className="login-to-continue-text">Log in to continue</div>
        <div className="login-buttons-container">    
          <GithubLogin />
          <GoogleLogin/>
        </div>
      </div>
    </div>
  );
}

export default Login;