import React, {useState, useEffect} from "react";
import axios from "axios";
import './rents.css';
import { useNavigate } from "react-router";
import {Link, useLocation} from 'react-router-dom';
import { useCookies } from "react-cookie";

export default function MovieRentsDetails(){
    const navigate = useNavigate()
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');

    let [rents, setRentDetails] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);
    

    useEffect(()=>{
        axios.get('/view-profile')
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
                <h1 className="text-center text-muted my-5" >Rents Page</h1>
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
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="movie-title" >{movie.user_id.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="email">Email: {movie.user_id.email}</p>
                                        <p className ="role">Role: {movie.user_id.role}</p>
                                        <p className ="rents">Total rents: {movie.user_id.rent}</p>
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