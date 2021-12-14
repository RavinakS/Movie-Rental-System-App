import React, {useState, useEffect} from "react";
import './homepage.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";

const Homepage = () =>{
    let navigate = useNavigate();
    
    let [cookie, setCookie] = useCookies(['token']);

    let logout = () => {
        setCookie('token', token);
        console.log(cookie);
        if(cookie === null || cookie === ''){
            console.log("not logedIn.");
            navigate('/login');
        }else{
            console.log("inside logout section.");
            navigate('/logout');
        }
    }   

    const checkUser = async (token) => {
        // await setCookie('token', token);
        console.log(cookie);

        axios.post('/get-token', {headers: {cookie: cookie}})
        .then((res)=>{
            if(res.data === 'noToken'){
                navigate('/login');
            }
            else if(res.data === true){
                navigate('/admin-movie-page');
            }else{
                navigate('/user-movie-page');
            }
        })
    }

    // useEffect(()=>{
    //     checkUser(cookies);

    //     return () =>{
    //         return setState({});
    //     }
    // }, [cookies]);

    return (
        <div className="App">
            <div className="homepage">
                <h1 className="text-center text-warning my-5" > ** You're Well Come To Home-Page **</h1>
                <div className="button" onClick={() => logout()}>Logout</div>
                <div className="button" onClick={() => checkUser()} >Admin Movie Page</div>
                <div className="button" onClick={() => navigate('/user-movie-page')} >User Movie Page</div>
            </div>
        </div>
    )
}

export default Homepage;