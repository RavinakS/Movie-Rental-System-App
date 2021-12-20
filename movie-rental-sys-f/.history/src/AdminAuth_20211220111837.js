import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const IsAdmin = () => {
    const role = localStorage.getItem('role')

    return (role.toLowerCase() === "admin") ? <Navigate to="/user-movie-page" /> : <Navigate to="/user-movie-page" />;
}

export default ProtectedRoute;
