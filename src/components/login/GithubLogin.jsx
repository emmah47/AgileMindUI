import githubIcon from "../../images/githubIcon.png"

function GithubLogin() {
  const handleLogin = ()=>{
    window.location.href = `http://localhost:8080/oauth2/authorization/github`;
  }

  return (
    <div className="sso-login-button-container" onClick={handleLogin}>
      <img className="sso-login-icon" src={githubIcon} />
      <div className="sso-login-button">GitHub</div>
    </div>
  );
};

export default GithubLogin;
