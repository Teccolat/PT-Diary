import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { setUser } from "../redux/userSlice";

function Profile() {

    const { user } = useSelector((state) => state.user);
    const { workouts } = useSelector((state) => state.workouts);
   
    const dispatch = useDispatch();
    console.log("User", user);
    const navigate = useNavigate();

    useEffect(()=>{

        console.log("I'm in Profile page")
        dispatch(setUser(user))

    },[dispatch ])
  
  return (
    <Layout>
      <div className="profile-details">
      <p><strong>Name: </strong>{user.name}</p>
      <p><strong>Email Address: </strong>{user.email}</p>
      { user.roleType &&  user.roleType ==="personalTrainer" ?
      <p><strong>User Role: </strong> Personal Trainer</p>: <p><strong>User Role: </strong> Client</p>}
    </div>
    </Layout>
   
  )
}

export default Profile