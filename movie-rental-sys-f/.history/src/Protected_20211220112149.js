import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const role = localStorage.getItem('role');

    if(role != null){

    }
}

export default ProtectedRoute;
