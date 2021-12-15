import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default async function Logout(){
    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['token']);

    setCookie('token', cookies);

    try{
        res = axios.get("/logout", {headers: {cookie: cookies}});
        alert(res.data);
        return navigate('/login');
    }
    
    .then((res)=>{
        
    })
    .catch((err)=>{
        console.log(err);
    })
};
