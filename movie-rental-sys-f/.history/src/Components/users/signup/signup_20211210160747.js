import React, { useState, useEffect } from "react";
import './signup.css';
import '../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Signup(){
    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['token']);
    let [state, setState] = useState({});

    let checkUser = () => {
        setCookie('token', cookies);

        axios.post('/get-token', {headers: {cookie: cookies}})
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

    useEffect(()=>{
        checkUser();
        return ()=>{
            return setState({});
        }
    }, []);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const signUp = async () =>{
        const {name, email, password} = user;
        if(name && email && password){
            try{
                let res = await axios.post("/create-account", user);
                alert(res.data.status_code);
                navigate('/movie-page');
            }catch(error){
                alert(error.response.data.message);
            }
        }else{
            alert("Invalid Inputs");
        }

    }

    useEffect(()=>{
        signUp
    })

    return (
        <div className="App">
            <div className="signup">
                <h1>Signup</h1>
                <input type="text" name = "name" value = {user.name} placeholder="Your Name" onChange = { handleChange }></input>
                <input type="text" name = "email" value = {user.email} placeholder="Your Email" onChange = { handleChange }></input>
                <input type="password" name = "password" value = {user.password} placeholder="Password" onChange = { handleChange }></input>
                <button className="button" onClick = {signUp}>Signup</button>
                <div>or</div>
                <div className="button" onClick = {()=>{
                    navigate("/login")
                }} >Login</div>
            </div>
        </div>
    )
};