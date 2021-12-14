import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Logout(){
    let navigate = useNavigate();

    axios.get("/logout")
    .then((res)=>{
        alert(res.data);
        navigate('/login');
    })
};

