import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import {
  setWorkouts,
  createWorkout,
  deleteWorkout,
} from "../redux/workoutsSlice";


function WorkoutForm({setFormUpdate}) {
// State to capture FORM input/ variable
  const [inputClient, setInputClient] = useState([]);
  const [selected, setSelected] = useState();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState();
  const [reps, setReps] = useState();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Fetch all the client from the backend
  const { user } = useSelector((state) => state.user);
  const { workouts } = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  // console.log("User", user);
  const navigate = useNavigate();


// Refresh the page when the dispatch is called
  useEffect(() => {

  // The fetchData function will be fetching Clients profile, This will be avialbe on 'WORKOUT FORM' for personal trainer. 
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();

      if (response.ok || response.status.code == 304) {
        console.log("setSearchResultClient", json);
        // If the response is ok or if the information hasn't changed from pervious fetch then update the Input status.
        setInputClient(json);
      }
    };
    //  Call the function above
    fetchData();
    setSelected("");
  }, [dispatch]);


  // POST method updated the database with the new workout plan for a single client (pt_id) by a Personal trainer (client_id)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    // An object to create workout detail
    const workout = {
      title: title,
      load: load,
      reps: reps,
      client_id: selected._id,
      pt_id: user.user_id,
    };
// The API to POST a new workout
    const response = await fetch("http://localhost:8080/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      setSelected("")
      dispatch(createWorkout(json));
      setFormUpdate(true)
      console.log("response from server for creating new workout")
      console.log(json)
    }
  };

  //The form that allow personal trainer to update with latest new workout plan for their user.
  return (
    <div className='formContainer' >
    <form onSubmit={handleSubmit}>
      {/* Title for FORM */}
      <h3>Workout Form</h3>

      {/* Capture personal trainer input  (Exercise Title, Load, Reps)  */}
      <label for="excersiseTitle" className="form-lable">
        {" "}
        Excersise Title:
      </label>
      <input
        id="excersiseTitle"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields &&
          emptyFields.includes("title") ? "error" : "" + "form-control"
        }
      />

      <label for="load" className="form-lable">
        Load (in kg):
      </label>
      <input
        id="load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields && emptyFields.includes("load") ? "error" : "" + "form-control"}
      />
      <label for="reps" className="form-lable">
        Reps:
      </label>

      <input
        id="reps"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields && emptyFields.includes("reps") ? "error" : "" + "form-control"}
      />
      {/* List of clients available for personal trainer */}
      <select
        onChange={(e) => {
          const c = inputClient?.find((client) => client._id === e.target.value);
          setSelected(c);
        }}
        defaultValue="default"
      >
        <option value="default" >Choose an option</option>
        {inputClient? inputClient.map((client) => {
              return (
                <option key={client._id} value={client._id}>
                  {client.fullName}
                </option>
              );
            })
          : null}
      </select>
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
}

export default WorkoutForm;
