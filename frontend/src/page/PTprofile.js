import react, {useEffect,useState} from 'react';
import { Navigate, useNavigate, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setWorkouts,createWorkout,deleteWorkout} from "../redux/workoutsSlice";

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function PTprofile({client}) {
 
    const {user} = useSelector(state => state.user);
    const {workouts} = useSelector(state => state.workouts);
    const [clientName, setClientName] = useState("");
  
    const dispatch = useDispatch();
    console.log("workouts",workouts);
    console.log("User from workout form",user);
    const navigate =useNavigate();


// Get Client name to display using client id on workoutsummary that is returend from server
  useEffect (() =>{

    const ClientsprofileDetail = async () => {

        const response = await fetch('http://localhost:8080/api/user/' + client._id, {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    const json = await response.json()

    if (response.ok) {
        setClientName(json.fullName)
        console.log(json.fullName)
    }
    }

    ClientsprofileDetail()},[dispatch, workouts, client])
    

  return (
    <div className="workout-details">
      <Link to={`/client/${client._id}`} ><h4>{clientName}</h4></Link>
      <p><strong>Number of Workout: </strong>{client.totalCount}</p>
    </div>
  )
}

export default PTprofile
