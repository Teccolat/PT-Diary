import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { setCredentials, logout, setOpenSidebar } from "../redux/userSliceSlice";

function Login() {
  // const {loading} = useSelector(state => state.alerts);
  // console.log("Loading State",loading);
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userloginRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();


    //Function to handle a signup a new user to the website
    const handleAuthenticate = (e) => {
      e.preventDefault();
      fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((response) => {
          return response.json();
        }).then((data) => {
  
          // try {
            if (data){
              toast.success(data.message);
              console.log(data.message)
              toast('Redirecting to home page');
              localStorage.setItem("token", data.data);
              navigate('/');
            } else {
              toast.error(data.message)}
            // }
            // catch (error) {
            // toast.error("Something went wrong")}
  
        });
      };
  

  return (
    <div>
      <form className="login" onSubmit={handleAuthenticate}>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ref={userloginRef}
            placeholder="Email"
          />{" "}
          <br />
          <label>Enter your Password </label>
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
          <Link to="/signup" className="anchor">
            CLICK HERE TO SINGUP
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
