import React from "react";
import './homepage.css';
import { useNavigate } from "react-router";

const Homepage = () =>{
    let navigate = useNavigate();

    return (
        <div className="homepage">
            <h1>Hello Home-Page</h1>
            <div className="button" onClick={()=>{
                navigate('/login')
            }} >Logout</div>
        </div>
    )
}

export default Homepage;