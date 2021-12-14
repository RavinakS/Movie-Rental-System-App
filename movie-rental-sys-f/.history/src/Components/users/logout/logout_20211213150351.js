import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Logout(){
    let navigate = useNavigate();

    let res = await axios.get("/logout");

    alert(res.data);
    
    navigate('/login');
};

