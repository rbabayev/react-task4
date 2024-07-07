import { Link } from "react-router-dom";

function AutoSwitch() {
  return (
    <div className="header">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/signinform">
        SignIn Page
      </Link>
      <Link className="link" to="/signupform">
        SignUp Page
      </Link>
    </div>
  );
}

export default AutoSwitch;
