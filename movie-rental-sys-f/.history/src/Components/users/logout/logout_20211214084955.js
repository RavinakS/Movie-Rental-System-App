import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Logout(){
    let navigate = useNavigate();

    await setCookie('token', token);

    axios.get("/logout")
    .then((res)=>{
        alert(res.data);
        navigate('/login');
        return null;
    })
    .catch((err)=>{
        console.log(err);
    })
};

