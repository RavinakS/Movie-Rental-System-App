import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const Is = () => {
    const role = localStorage.getItem('role')

    return (role.toLowerCase() === "admin") ? <Outlet /> : <Navigate to="/user-movie-page" />;
}

export default ProtectedRoute;
