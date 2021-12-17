import React, {useState, useEffect} from "react";
import axios from "axios";
import './rents.css';
import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';

export default function MovieRentsDetails(){
    const { state } = useLocation();
    console.log(state);
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    // let [state, setState] = useState({});

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data);
        })
        .catch(err => alert(err.response))
    }

    // useEffect(()=>{
    //     moviePage();
    //     return () =>{
    //         return setState({});
    //     }
    // }, []);


    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >Movie Name</h1>
            </header>
            <div className="container">
                <div className="row">
                {movies.map((movie) =>{
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
                    )})}
                </div>
            </div>
        </>
    )
}