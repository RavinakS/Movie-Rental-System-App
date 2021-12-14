import React, { useState } from "react";
import './signup.css';
import '../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Logout(){
    let navigate = useNavigate();

    let res = await axios.post("/logout", user);
    
    navigate('/login');

    }
};