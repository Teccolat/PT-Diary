import react from 'react'
import { Navigate } from 'react-router-dom'

// This component will allow to return props children whether there is a local token or not
function PublicRoute(props) {
    if(localStorage.getItem('token')){
        return <Navigate to='/login' />;
    }else{
        return props.children
    }
}

export default PublicRoute;