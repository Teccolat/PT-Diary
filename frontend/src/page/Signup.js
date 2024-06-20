import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
// import { showLoading, hideLoading } from "../redux/alertsSlice";

function Signup() {
  // const dispatch = useDispatch();
  const [fullName, setUserFullName] = useState("");
  const [roleType, setRoleType] = useState("personalTrainer");
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const userloginRef = useRef();
  const passwordRef = useRef();
  const userFullNameRef = useRef();

  const navigate = useNavigate();

  const roleTypeValue = [
    { type: "Personal Trainer", value: "personalTrainer" },
    { type: "Client", value: "client" },
  ];

  // Function to handle the media type change
  const handleRoleTypeChange = (e) => {
    setRoleType(e.target.value); // Get value from the input and save it in 'media'
  };

  //Function to handle a signup a new user to the website
  const handleRegistration = (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        roleType: roleType,
        email: usernameEmail,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // dispatch(hideLoading())
        try {
          if (data.success) {
            toast.success(data.message);
            toast("Redirecting to login page");
            navigate("/login");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      });
  };

  // A form to signup a new user
  return (
    <div>
      <form className="signup" onSubmit={handleRegistration}>
        <div>
          <label>Full Name</label>
          <input
            ref={userFullNameRef}
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setUserFullName(e.target.value)}
          />{" "}
          <br />
          <label>Role Type</label>
          <select onChange={handleRoleTypeChange}>
            {/* Map through roleTypeValue array to create a list of options to select from */}
            {roleTypeValue &&
              roleTypeValue.map((roleType) => (
                <option key={roleType.value} value={roleType.value}>
                  {roleType.type}
                </option>
              ))}
          </select>
          <br /> <label>Email address</label>
          <input
            ref={userloginRef}
            placeholder="Email"
            value={usernameEmail}
            onChange={(e) => setUsernameEmail(e.target.value)}
          />{" "}
          <br />
          <label>Enter a Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <div>
          <Link to="/login" className="anchor">
            CLICK HERE TO LOGIN
          </Link>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
