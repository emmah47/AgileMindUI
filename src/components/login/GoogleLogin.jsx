import googleIcon from "../../images/googleIcon.png"

function GoogleLogin() {
  const handleLogin = ()=>{
    // window.location.href = `http://localhost:8080/oauth2/authorization/github`;
  }

  return (
    <div className="sso-login-button-container">
      <img className="sso-login-icon" src={googleIcon} />
      <div className="sso-login-button" onClick={handleLogin}>Google</div>
    </div>
  );
};

export default GoogleLogin