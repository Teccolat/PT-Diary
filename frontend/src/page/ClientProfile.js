import react, {useEffect,useState} from 'react';

//This component is for users with client role types.
function ClientProfile({ workout }) {
//Render the list of workouts for client that is logged in to the app
  return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong> {workout.load } </p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        </div>
  )
}

export default ClientProfile