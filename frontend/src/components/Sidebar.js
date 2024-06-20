import React, { useState }from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdAccountCircle,
  MdHelp,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Help from "../page/Help";



const Sidebar = () => {
     // UseState to save whether the help sidebar is open or closed. This will be set by both buttons on the sidebar or 'X' in the help content.
   const [showHelp, setShowHelp] = useState(false);

   const handleHelpShow = () =>{
    console.log(showHelp)
    showHelp? setShowHelp(false): setShowHelp(true)
  };// Set state

//List of side bar content
const sidebarLink = [
  {
    label: "Dashboard",
    link: "/",
    icon: <MdDashboard />,
  },
  {
    label: "Profile",
    link: "/profile",
    icon: <MdAccountCircle/>,
  },
    
];

//Render the sidebar content for NavLink.
  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
      >
        {el.icon}
        <span>{el.label}</span>
      </Link>
    );
  };
//Render the sidebar content 
  return (
    <div className="sideBar-container" >
      <h1 >
        {/* Loggo for the APP */}
        <p>
          <MdOutlineAddTask />
        </p>
        <span>Welcome</span>
      </h1>
        {sidebarLink.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
        {/* Help button gives a little introduction to Application */}
        <button onClick={handleHelpShow}>
          <MdHelp/>
          <span>helps</span>
        </button>
        { showHelp &&
          <Help handleHelpShow={handleHelpShow} showHelp={showHelp}/>
          }
      </div>
  );
};

export default Sidebar;