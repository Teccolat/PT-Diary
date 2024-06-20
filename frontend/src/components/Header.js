import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { setshowHelpSidebar } from "../redux/showHelpSidebarSlice";
import { useSelector } from "react-redux";

function Header({ user, dispatch, setUser }) {

  // UseState to save whether the help sidebar is open or closed
  const { showHelpSidebar } = useSelector((state) => state.showHelpSidebar);
  const navigate = useNavigate();

  //For the small screen the sidebar content will disappear and the sandwich bar button will be visible. The state of showHelpSidebar will determine if visible or not
  const BarHandlerShow = () => {
    console.log(showHelpSidebar);
    showHelpSidebar
      ? dispatch(setshowHelpSidebar(false))
      : dispatch(setshowHelpSidebar(true));
  }; // Set state

  // When user end the session, The function below clean the local storage to Null
  function logoutHandler(e) {
    e.preventDefault();
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  }
  return (
    <div>
      {/* Title of the APP- Header */}
      <h1>Personla Trainer Diary</h1>
      <div>
        {/* Only visble for small screen and will controle the sidebar content to be visible or not*/}
        <button onClick={BarHandlerShow}>
          <MdOutlineMenu className="Bar" size={50} />
        </button>
      </div>
      <button onClick={logoutHandler}>Logout</button>
      {user && <Link to="/">{user.name} </Link>}
    </div>
  );
}

export default Header;
