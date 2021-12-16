import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Logout(){
    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['token']);
    localStorage.removeItem("name of the item");
    localStorage.removeItem("name of the item")

    setCookie('token', cookies);

    axios.get("/logout", {headers: {cookie: cookies}})
    .then((res)=>{
        alert(res.data);
    })
    .then(()=>{
        navigate('/login');
    })
    .catch((err)=>{
        console.log(err);
        navigate('/login');
    })

    return null;
};

