import React, {useState, useEffect} from "react";
import './homepage.css';
import { useNavigate } from "react-router";
import navButtons from "../../helper/nav";

const Homepage = () =>{
    let navigate = useNavigate();

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
                <div class="collapse navbar-collapse">
                    {navButtons()}
                </div>
            </nav>
            
        </>
    )
}

export default Homepage;