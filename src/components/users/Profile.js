import React, { useContext, useState } from "react";
import "./Profile.css";
import UserContext from "../../hooks/UserContext";
import Navbar from "../navbar/Navbar";

// Profile Page which user can change their password and other info
function Profile({changeProfile}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    password: "",
    email:currentUser.email
  });

  function handleChange(e) {
    e.persist();
    console.log(e.target.value)
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await changeProfile(currentUser.username, formData);
    if (res["success"]){
      setSuccessMsg(res["success"]);
    }else{
      setSuccessMsg(res["error"]);
    }
  }


  return (
    <div className="profile">
      <Navbar></Navbar>
          <div className="profile-card">
          <h3 className="profile-title">Profile</h3>
            <form>
              <div className="profile-label-font">
                <label>Username</label>
                <p className="profile-username">{currentUser.username}</p>
              </div>

              <div className="profile-label-font">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={currentUser.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-label-font">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={currentUser.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-label-font">
                <label>Email</label>
                <input
                  name="email"
                  value={currentUser.email}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-label-font">
                <label>Confirm password to make changes:</label>
                <input
                  type="password"
                  name="password"
                  value={currentUser.password}
                  onChange={handleChange}
                />
              </div>

              {setSuccessMsg
              ? <p className="successMsg">{successMsg}</p>
              : <p className="errorMsg">{errorMsg}</p>}

              <button
                className="profile-page-btn"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
            </div>




    </div>

  );
}

export default Profile;