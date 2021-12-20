import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const IsAdmin = () => {
    const role = localStorage.getItem('role')

    if(role != null){
        return (role.toLowerCase() === "admin") ? <Navigate to="/admin-movie-page" /> : <Navigate to="/user-movie-page" />;
    }
    
    return (role.toLowerCase() === "admin") ? <Navigate to="/admin-movie-page" /> : <Navigate to="/user-movie-page" />;
}

export default IsAdmin;
