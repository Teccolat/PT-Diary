import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {userSlice} from './userSlice';
import { workoutsSlice } from './workoutsSlice';
import { showHelpSidebarSlice } from './showHelpSidebarSlice';


const rootReducer =combineReducers({

    user: userSlice.reducer,
    workouts: workoutsSlice.reducer,
    showHelpSidebar:showHelpSidebarSlice.reducer

});

const store =configureStore({
    reducer: rootReducer,
});

export default store;