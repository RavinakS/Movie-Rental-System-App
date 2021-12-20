import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Swal2 from "sweetalert2";

export default function Logout(){
    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['token']);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");

    setCookie('token', cookies);

    axios.get("/logout", {headers: {cookie: cookies}})
    .then((res)=>{
        Swal2.fire({
            icon : "success",
            title : res.data
        })
        // alert(res.data);
    })
    .then(()=>{
        navigate('/login');
    })
    .catch((err)=>{
        Swal2.fire({
            icon : "success",
            title : res.data
        })
        console.log(err);
        navigate('/login');
    })

    return null;
};
