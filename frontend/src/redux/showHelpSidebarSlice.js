import { createSlice } from "@reduxjs/toolkit";

export const showHelpSidebarSlice= createSlice({
  name: "showHelpSidebar",
  initialState:{
    showHelpSidebar:false
  },

  reducers: {
    setshowHelpSidebar: (state, action) => {
      state.showHelpSidebar= action.payload;
    },
  },
});

export const {setshowHelpSidebar } = showHelpSidebarSlice.actions;