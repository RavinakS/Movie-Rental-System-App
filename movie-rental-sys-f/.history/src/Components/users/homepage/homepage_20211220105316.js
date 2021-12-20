import React, {useState, useEffect} from "react";
import './homepage.css';
import { useNavigate } from "react-router";

const Homepage = () =>{
    let navigate = useNavigate();

    function buttonsToShow(){
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if(isAuthenticated){
            
        }
    }

    return (
        
    )
}

export default Homepage;