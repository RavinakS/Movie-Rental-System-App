import axios from "axios";
import React, {useState, useEffect} from "react";
import './login.css';
import { useNavigate } from "react-router";

const Login = () =>{
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async () =>{
        let {email, password} = user;
        if(email && password){
            try{
                let res = await axios.post('/login', user);
                alert(res.data.message);
                navigate('/user-movie-page');
            }catch(err){
                alert(err.response.data.message);
            }
        }
    }

    return (
        <div className="App">
            <div className="login">
                <h1>Login</h1>
                <input type="text" name = "email" value = {user.email} onChange = { handleChange } placeholder="Enter your Email"></input>
                <input type="password" name = "password" value = {user.password} onChange = { handleChange } placeholder="Enter the password"></input>

                <button className="button" onClick = {login}>Login</button>

                <div>or</div>

                <div className="button" onClick={()=>{
                    navigate('/create-account')
                }} >Signup</div>
            </div>
        </div>
    )
}

export default Login;