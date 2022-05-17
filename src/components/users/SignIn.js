import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignIn.css"

// Sign in form
function SignIn({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState("");

  function handleChange(e) {
    e.persist();
    console.log(e.target.value);
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  }


  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    // get login token, if errors, give err msg, else link to /
    let response = await login(formData);
    if (response["success"]) {
      history.push("/");
    } else {
      setFormErrors(response.error);
    }

  }


  return (

    <div className="signin">
      <div className="nav-sign-in-page">
        <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img>
      </div>
      <div className="signin-card">
        <div>
          <form>
            <div className="signin-label-font">
              <label>Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signin-label-font">
              <label>Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {formErrors != ""
              ? <p className="danger" messages={formErrors}>{formErrors}</p>
              : null}

            <button className="signin-page-btn" onClick={handleSubmit}>
              Sign In
            </button>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>

          </form>
        </div>
      </div>
    </div>





  );
}

export default SignIn;