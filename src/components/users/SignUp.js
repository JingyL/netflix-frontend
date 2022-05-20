import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css"

// sign up form
function SignUp({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState("");
  const history = useHistory();

  function handleChange(e) {
    e.persist();
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await signup(formData);
    if (response["success"]) {
      history.push("/");
    } else {
      setFormErrors(response.error);
    }
  }

  return (
    <div className="signup">
      <div className="nav-sign-up-page">
        <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img>
      </div>
      <div className="signup-card">
        <div>
          <form>
            <div className="signup-label-font">
              <label>Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="signup-label-font">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="signup-label-font">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="signup-label-font">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="signup-label-font">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors != ""
              ? <p className="danger" messages={formErrors}>{formErrors}</p>
              : null}

            <button
              className="signup-page-btn"
              onClick={handleSubmit}
            >
              Sign up
            </button>
            <Link to="/signin" className="signin-btn">
              Sign In
            </Link>
          </form>
        </div>
      </div>




    </div>

  );
}

export default SignUp;