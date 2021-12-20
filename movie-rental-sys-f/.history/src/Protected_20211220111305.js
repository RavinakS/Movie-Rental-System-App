import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const role = localStorage.getItem('role')

    return (role.toLowerCase() === "addmIn") ? <Outlet /> : <Navigate to="/user-movie-page" />;
}

export default ProtectedRoute;
