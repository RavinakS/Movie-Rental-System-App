import React, { useState } from "react";
// import './signup.css';
import .
import '../../../../App.css';
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
                <h1>Details of the movie</h1>
                <input type="text" name = "name" value = {movie.name} placeholder="Movie Name" onChange = { handleChange }></input>
                <input type="text" name = "genre" value = {movie.genre} placeholder="Genre" onChange = { handleChange }></input>
                <input type="text" name = "releasDate" value = {movie.releasDate} placeholder="Release Date" onChange = { handleChange }></input>
                <input type="number" name = "avalCD" value = {movie.avalCD} placeholder="rents" onChange = { handleChange }></input>
                <button className="button" onClick = {addingMovie}>Add</button>
                <div>or</div>
                <div className="button" onClick = {()=>{
                    navigate("/login")
                }} >Back</div>
            </div>
        </div>
    )
};