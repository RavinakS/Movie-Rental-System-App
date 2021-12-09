import React from "react";
import './homepage.css';
import { useNavigate } from "react-router";
import { useCookie}
import axios from "axios";

const Homepage = () =>{
    let navigate = useNavigate();

    let checkUser = () => {
        axios.post('/get-token')
        .then((res)=>{
            if(res.data === true){
                navigate('/admin-movie-page');
            }else{
                navigate('/user-movie-page');
            }
        })
    }

    return (
        <div className="App">
            <div className="homepage">
                <h1 className="text-center text-warning my-5" > ** You're Well Come To Home-Page **</h1>
                <div className="button" onClick={()=>{
                    navigate('/login')
                }}>Logout</div>
                <div className="button" onClick={()=>{checkUser()}} >Admin Movie Page</div>
                <div className="button" onClick={()=>{checkUser()}} >User Movie Page</div>
            </div>
        </div>
    )
}

export default Homepage;