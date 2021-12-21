import React, { useState } from "react";
import './updateMovie.css';
import '../../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import navButtons from "../../../helper/nav";

export default function UpdateMovie(){
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

    const updatingMovie = async () =>{
        const {name, genre, releasDate, avalCD} = movie;
        if(name && genre && releasDate && avalCD){
            try{
                let res = await axios.put("/update-movie", movie);
                Swal2.fire({
                    icon : "success",
                    title : res.data.message
                })
                navigate('/admin-movie-page');
            }catch(error){
                Swal2.fire({
                    icon : "error",
                    title : error.response.data.message
                })
                console.log(error.response.data);
            }
        }else{
            Swal2.fire({
                icon : "error",
                title : "Invalid Inputs"
            })
        }

    }

    return (
        <>
        </>
        <div className="App">
            <div className="updateMovie">
                <h1>Movie Details</h1>
                <input type="text" name = "name" value = {movie.name} placeholder="Movie Name" onChange = { handleChange }></input>
                <input type="text" name = "genre" value = {movie.genre} placeholder="Genre" onChange = { handleChange }></input>
                <input type="text" name = "releasDate" value = {movie.releasDate} placeholder="Release Date" onChange = { handleChange }></input>
                <input type="number" name = "avalCD" value = {movie.avalCD} placeholder="rents" onChange = { handleChange }></input>
                <button className="button" onClick = {updatingMovie}>Update</button>
                <div>or</div>
                <div className="button" onClick = {()=>{
                    navigate("/admin-movie-page")
                }} >Back</div>
            </div>
        </div>
    )
};