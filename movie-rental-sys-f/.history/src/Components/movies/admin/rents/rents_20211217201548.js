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
    let [allUsers, setallUsersDetails] = useState([]);
    let [user, setUser] = useState([]);

    // function getUsersDetails(user_id){
    //     console.log(allUsers, user_id);
    //     if(allUsers.length != 0){
    //         allUsers.forEach(userInfo =>{
    //             if(userInfo.email == user_id){
    //                 setUser(userInfo)
    //             }
    //         })
    //     }
    // }

    useEffect(()=>{
        axios.get(`/movie-rents/${name}`)
        .then((response) => {
            console.log("this", response.data.);
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

    // console.log(rents);

    // useEffect(()=>{
    //     axios.get(`/view-users-data`, {headers: {cookie: cookies}})
    //     .then((res)=>{
    //         console.log(res.data.data, 'api response')
    //         setallUsersDetails(res.data.data);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }, [])

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
                                        <p className="name">User Name: {movie.users.name}</p>
                                        <p className="email">Email: {movie.users.email}</p>
                                        <p className ="role">Role: {movie.users.role}</p>
                                        <p className ="rents">Total rents: {movie.users.rents}</p>
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