import React, { useState } from "react";
// import './signup.css';
// import '../../../App.css';

import axios from "axios";
import { useNavigate } from "react-router";

export default function Addmovie(){
    let navigate = useNavigate();

    const [movie, setUser] = useState({
        name: "",
        genre: "",
        releasDate: "",
        avalCD: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...movie,
            [name]: value
        })
    }

    const addingMovie = async () =>{
        const {name, genre, releasDate, avalCD} = movie;
        if(name && genre && releasDate && avalCD){
            try{
                let res = await axios.post("/add-movie", movie);
                alert(res.data.status_code);
                navigate('/admin-movie-page');
            }catch(error){
                alert(error.response.data.message);
                // navigate('/admin-movie-page');
            }
        }else{
            alert("Invalid Inputs");
        }

    }

    return (
        <div className="App">
            <div className="signup">
                <h1>Signup</h1>
                <input type="text" name = "name" value = {user.name} placeholder="Movie Name" onChange = { handleChange }></input>
                <input type="text" name = "genre" value = {user.email} placeholder="Genre" onChange = { handleChange }></input>
                <input type="text" name = "releasDate" value = {user.email} placeholder="Release Date" onChange = { handleChange }></input>
                <input type="number" name = "avalCD" value = {user.password} placeholder="rents" onChange = { handleChange }></input>
                <button className="button" onClick = {signUp}>Add</button>
                <div>or</div>
                <div className="button" onClick = {()=>{
                    navigate("/login")
                }} >Back</div>
            </div>
        </div>
    )
};