import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setWorkouts,
  createWorkout,
  deleteWorkout,
} from "../redux/workoutsSlice";
import Layout from "../components/Layout";
import ClientProfile from "../page/ClientProfile";
import PTprofile from "../page/PTprofile";
import WorkoutForm from "../components/WorkoutForm";
import Button from 'react-bootstrap/Button';


function Home() {
  const { user } = useSelector((state) => state.user);
  const { workouts } = useSelector((state) => state.workouts);
  const [ formUpdate , setFormUpdate] =useState(false)
  const [workoutSummary, setWorkoutSummary] = useState([]);
 
  const dispatch = useDispatch();
  console.log("User", user);
  const navigate = useNavigate();

  // Fetch the summary of workout for personal trainer profile page and client profile page
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:8080/api/workouts/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const json = await response.json();

      if (response.ok) {
        // Save the workout data assosiated with personal trainer or client 
        dispatch(setWorkouts(json.data));
        console.log("Workout return", json.data)
        //For data associated with personal trainer page, there will be workoutSummary object 
        console.log(" //For data associated with personal trainer page, there will be workoutSummary object ")
        setWorkoutSummary(json.workoutSummary)
        console.log(json.workoutSummary)
        setFormUpdate(false)
      }
    };

    if (user) {
      fetchWorkouts()

    }
      fetchWorkouts()
  }, [user, formUpdate]);

// Fetch Personal trainer detail name for client profile page
  useEffect(() => {

    if (workouts){

      const PTprofileDetail = async () => {
          // Call the api user get method with personal trainer id 
        const response = await fetch("http://localhost:8080/api/user/" + workouts[0].pt_id , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const json = await response.json();

        if (response.ok || response.status.code == 304) {
          console.log("PTprofileDetail",json )
          
          localStorage.setItem("setPTName",json.fullName)
  
        }
      }
      PTprofileDetail();
      };

    }, [dispatch]);

  return (
    <Layout>
      <div className="home">
        <div className="workouts">
          <div>
            {" "}
            {user && user.roleType === "client"
              ? <h2>Welcome {user.fullName}, You have a personal fitness plan by {localStorage.getItem("setPTName")}</h2>
              : workoutSummary.length > 1 ? <h2>You have {workoutSummary.length} clients</h2>: <h2>You have {workoutSummary.length} client.</h2>
             }
          </div>
          {user &&
            user.roleType === "client" &&
            workouts &&
            workouts.map((workout) => (
              <ClientProfile key={workout._id} workout={workout} />
      
            ))}
          </div>
          {user &&
            user.roleType === "personalTrainer" && workoutSummary && 
              Object.entries(workoutSummary).map(([key, client]) => (
              <PTprofile key={key} client={client} workoutSummary={workoutSummary} />
            ))
            }
          </div>
          <div className="workouts-form">
           {user &&
            user.roleType === "personalTrainer" && 
             <WorkoutForm setFormUpdate={setFormUpdate}/>
            }
        </div>
      
    </Layout>

  );
}

export default Home;
