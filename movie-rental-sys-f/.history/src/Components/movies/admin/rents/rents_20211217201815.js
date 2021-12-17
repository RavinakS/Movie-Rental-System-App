import React, {useState, useEffect} from "react";
import axios from "axios";
import './rents.css';
import { useNavigate } from "react-router";
import {Link, useLocation} from 'react-router-dom';

export default function MovieRentsDetails(){
    const navigate = useNavigate()
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');

    let [rents, setRentDetails] = useState([]);

    useEffect(()=>{
        axios.get(`/movie-rents/${name}`)
        .then((response) => {
            console.log("hiii",response.data);
            setRentDetails(response.data);
        })
        .catch((err) =>{
            try{
                console.log(err.response);
                if(err.response.data.message === "No Rents"){
                    setRentDetails(["No Rents"]);
                }
            }catch(err){
                console.log(err);
            }
        })
    }, [])

    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >Rents Page</h1>
            </header>
            <div className="container">
                <div className="row">
                {rents.map((movie) =>{
                    if(movie === "No Rents"){
                        return (
                            <div className ="card border-warning">
                                <div className="card-body bg-">
                                    <p className="text-center text-danger">No Rents</p>
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="col-md-3" key={movie._id}>
                                <div className ="card">
                                    <div className="card-body">
                                        <p className="name">User Name</p>
                                        <p className="email">Email</p>
                                        <p className ="role">Role: {movie.users.role}</p>
                                        <p className ="rents">Total rents: {movie.users.rents}</p>
                                        {/* <p className="name">User Name: {movie.users.name}</p>
                                        <p className="email">Email: {movie.users.email}</p>
                                        <p className ="role">Role: {movie.users.role}</p>
                                        <p className ="rents">Total rents: {movie.users.rents}</p> */}
                                    </div>
                                </div>
                            </div>
                        )
                    }})}
                </div>
            </div>
            <div className="container">
                <div className="button text-center" onClick = {()=>{
                    navigate("/admin-movie-page")
                }}>Back</div>
            </div>
        </>
    )
}