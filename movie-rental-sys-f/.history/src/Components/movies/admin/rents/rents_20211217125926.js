import React, {useState, useEffect} from "react";
import axios from "axios";
import './rents.css';
import { useNavigate } from "react-router";
import {Link, useLocation} from 'react-router-dom';

export default function MovieRentsDetails(){
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    console.log(name);

    let [rents, setRentDetails] = useState([]);

    let movieRents = () =>{
        axios.get(`/movie-rents/${name}`)
        .then((response) => {
            console.log(response.data);
            setRentDetails(response.data.data);
        })
        .catch((err) =>{
            try{
                if(err.response.data.message === "No Rents"){
                    setRentDetails(["No Rents"]);
                }
            }catch(err){
                console.log(err.response.data.message);
            }
        })
    }

    movieRents();

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
                            <div className="col-md-6" key={movie._id}>
                            <div className ="card">
                                <div className="card-body">
                                    <p className="name">"No Rents"</p>
                                </div>
                            </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="col-md-3" key={movie._id}>
                                <div className ="card">
                                    <div className="card-body">
                                        <p className="name">User Name: {movie.releasDate}</p>
                                        <p className="email">Email: {movie.genre}</p>
                                        <p className ="role">Role: {movie.avalCD}</p>
                                        <p className ="rents">Total rents: {movie.avalCD}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    })}
                </div>
            </div>
        </>
    )
}