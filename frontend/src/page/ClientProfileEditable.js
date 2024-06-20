import react, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setWorkouts,
  createWorkout,
  deleteWorkout,
} from "../redux/workoutsSlice";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Layout from "../components/Layout";

//This component is for users with personal trainer role types.
//Personal trainer will be able to view each client workout plan from a link on their home profile

function ClientProfile({ workout }) {
  const { user } = useSelector((state) => state.user);
  const { workouts } = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  console.log("workouts", workouts);
  console.log("User from workout form", user);
  const navigate = useNavigate();

  // When a  personal trainer click Delete button on client workout plan then a delete fetch with workout id is called
  const handleClick = async () => {
    console.log(workout._id);
    console.log(user);
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // If response from server is success then update the workout state
    if (response.ok) {
      dispatch(deleteWorkout(json));
      console.log("dispatch(deleteWorkout(json));")
    }{
      console.log("did not work")
    }
  };

  //  When Dispatch method is called rerender the client page
  useEffect(() => {
    console.log("Rerender Editable the page");
  }, [workouts]);

  // Each workout will be rendered in the followint format
  return (
    <div className="workout-details workout-details-editable">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong> {workout.load}{" "}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default ClientProfile;
