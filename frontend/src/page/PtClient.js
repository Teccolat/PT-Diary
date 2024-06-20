
import react, {useEffect,useState} from 'react';
import { Navigate, useNavigate,  useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setWorkouts,createWorkout,deleteWorkout} from "../redux/workoutsSlice";
import ClientProfileEditable from "../page/ClientProfileEditable";
import Layout from '../components/Layout';

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function PtClient({ workout }) {

  const [clientWorkout, setClientWorkout]=useState([]);
    const {user} = useSelector(state => state.user);
    const {workouts} = useSelector(state => state.workouts);
    const dispatch = useDispatch();
    console.log("workouts",workouts);
    console.log("User from workout form",user);
    const navigate =useNavigate();
    const { id } = useParams();

    
 // Fetch the summary of workout for personal trainer profile page
 useEffect(() => {
  const fetchWorkouts = async () => {
    const response = await fetch(`http://localhost:8080/api/workouts/`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      // headers: {'Authorization': `Bearer ${user.token}`},
    });
    const json = await response.json();

    if (response.ok) {

      dispatch(setWorkouts(json.data));
      // const Workout = (json.data).find((workout) => workout.client_id === id);
      // console.log("ClientWorkout", Workout )
      setClientWorkout("" )
      // console.log("Workoit return", json.data)
      // setPtProfileId(json.data[0].pt_id)
      // localStorage.setItem("PtProfileId",json.data[0].pt_id )
      // console.log("setPtProfileId",json.data[0].pt_id)
      // setWorkoutSummary(json.workoutSummary)
      // console.log(json.workoutSummary)
    }
  };

  if (user) {
    fetchWorkouts() 
    
  }
  }, [dispatch, user ]);

 

  return (
        <div>
          <Layout>
        {workouts && workouts.map((workout) => (
          workout.client_id === id && <ClientProfileEditable key={workout._id} workout={workout} />
  
        ))}
        </Layout>
        </div>
  )
}

export default PtClient