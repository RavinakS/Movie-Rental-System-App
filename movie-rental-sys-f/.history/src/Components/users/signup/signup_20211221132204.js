import React, { useState } from "react";
import './signup.css';
import '../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import navButtons from "../../helper/nav";

export default function Signup(){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const signUp = async () =>{
        const {name, email, password} = user;
        if(name && email && password){
            try{
                let res = await axios.post("/create-account", user);
                
                Swal2.fire({
                    icon : "success",
                    title : res.data.message
                })

                navigate('/user-movie-page');
            }catch(error){
                Swal2.fire({
                    icon : "error",
                    title : error.response.data.message
                })
            }
        }else{
            Swal2.fire({
                icon : "error",
                title : "Invalid Inputs"
            })
        }

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