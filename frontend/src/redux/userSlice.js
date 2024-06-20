import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //The Status of user will be determined if user have a valid token and local storage is updated from fetching the API
  initialState:{
    user: null,
    // localStorage.getItem("userInfo")
    // ? JSON.parse(localStorage.getItem("userInfo"))
    // : null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Create a userInfo Local storage and updated  with payload passed to the reducer
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;