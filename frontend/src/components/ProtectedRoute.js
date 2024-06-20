import react, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

// This component will be used to verify if the user session authenticated. 
// If Token was compromised or not, if the token is compmised the user will be directed to the login page.
function ProtectedRoute(props) {
  
  // Fetch user detail from the store state
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("User", user);
  const navigate = useNavigate();

  //Function to get user detail
  const getData = (e) => {
    // Fetch login user profile
    fetch("http://localhost:8080/api/user/get-user-info-by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

       // If the response looks okay then update the User state. If the response has error then navigate to login page
        try {
          if (data.success) {
            console.log("user data", data);
            dispatch(setUser(data.data));
          } else {
            localStorage.removeItem("token");
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          localStorage.clear();
          navigate("/login");
        }
      });
  };

// Everytime the user state is updated then fetch Get Data function
  useEffect(() => {
    if (!user) {
      getData();
    }
  }, [user,dispatch]);

// If token is availabe on local storage return the props.children that is passed to the function
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
