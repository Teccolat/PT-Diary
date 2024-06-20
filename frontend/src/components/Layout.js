import React from 'react'
import Header from './Header';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setshowHelpSidebar } from "../redux/showHelpSidebarSlice";
import Sidebar from './Sidebar';

// The Layout allows the application to have the same structure (Header and sidebars) across multiple pages.
function Layout({children}) {

// user contain the profile of logged in user
    const {user} =useSelector((state) => state.user);

// showHelpSidebar allow to determine if the application is running on small screen and the sidebar is controlled from the bar button
    const {showHelpSidebar} =useSelector((state) => state.showHelpSidebar);
    const dispatch = useDispatch();

// Render the layout
    return (
        <>
        {/* Controle the sidebar visibility depending if the screen is below 600px or higher */}
        <div className={showHelpSidebar? "sidebar" :"sidebar sidebarDisplay"}>
          <Sidebar/>
        </div>
        <div className='content-container'>
            {/* Header section */}
            <div className='header-section'>
            <Header user={user} dispatch={dispatch}  setUser={ setUser }/>
            </div>
              {/* Main body content section */}
            <div className='main-content-section'>
                {children}
            </div>
       </div>
       </>
    )};
export default Layout;
