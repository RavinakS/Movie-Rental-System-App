import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Signup(){
    let navigate = useNavigate();

    let [token, setToken] = useCookies(['token']);

    useEffect(()=>{
        setToken('token', token);

        axios.post('/get-token', {headers: {cookie: token}})
        .then((res)=>{
            if(res.data === 'noToken'){
                console.log(res.data);
                navigate('/login');
            }
            else if(res.data === true){
                navigate('/admin-movie-page');
            }else{
                navigate('/user-movie-page');
            }
        })

    })

    return (
        <div>

        </div>
    )
};