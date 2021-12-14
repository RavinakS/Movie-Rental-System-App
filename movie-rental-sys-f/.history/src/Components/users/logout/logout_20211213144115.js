import React, { useState } from "react";
import './signup.css';
import '../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Logout(){
    let navigate = useNavigate();

    let res = await axios.post("/logout", user);
    
    navigate('/user-movie-page');

    }

    return (
        <div className="App">
            <div className="signup">
                <h1>Signup</h1>
                <input type="text" name = "name" value = {user.name} placeholder="Your Name" onChange = { handleChange }></input>
                <input type="text" name = "email" value = {user.email} placeholder="Your Email" onChange = { handleChange }></input>
                <input type="password" name = "password" value = {user.password} placeholder="Password" onChange = { handleChange }></input>
                <button className="button" onClick = {signUp}>Signup</button>
                <div>or</div>
                <div className="button" onClick = {()=>{
                    navigate("/login")
                }} >Login</div>
            </div>
        </div>
    )
};