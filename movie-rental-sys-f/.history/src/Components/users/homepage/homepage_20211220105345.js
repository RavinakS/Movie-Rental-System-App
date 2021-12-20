import React, {useState, useEffect} from "react";
import './homepage.css';
import { useNavigate } from "react-router";

const Homepage = () =>{
    let navigate = useNavigate();

    function buttonsToShow(){
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if(isAuthenticated){
            return (
                <div className="App">
                    <div className="homepage">
                        <h1 className="text-center text-warning my-5" > ** You're Well Come To Home-Page **</h1>
                        <div className="button" onClick={() => navigate('/admin-movie-page')} >Admin Movie Page</div>
                        <div className="button" onClick={() => navigate('/user-movie-page')} >User Movie Page</div>
                    </div>
                </div>
            )
        }else{
            return 
        }
    }

    return (
        
    )
}

export default Homepage;