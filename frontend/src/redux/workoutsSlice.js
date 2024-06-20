import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
  //The state of workouts is initialised by assigning it to null
  name: "workouts",
  initialState:{
    workouts:null
  },

  reducers: {
    // Update the workout state with new payload from fetching existing workouts plan for user.
    setWorkouts: (state, action) => {
      state.workouts= action.payload;
    },
    // Create a new workout.
    createWorkout: (state, action) => {
      state.workouts= [action.payload, ...state.workouts]
    },
    // Delete a workout.
    deleteWorkout: (state, action) => {
      state.workouts= state.workouts.filter((w) => w._id !== action.payload._id)
    },
  },
});

export const { setWorkouts,createWorkout,deleteWorkout} = workoutsSlice.actions;