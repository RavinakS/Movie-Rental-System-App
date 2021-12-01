import React, {useState} from "react";
import './signup.css';
import axios from "axios";

export default function Signup(){

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
                let res = await axios.post("http://localhost:3040/create-account", user);
                alert(res.data.message);
            }catch(error){
                alert(error.response.data.message);
            }
        }else{
            alert("Invalid Inputs");
        }

    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <input type="text" name = "name" value = {user.name} placeholder="Your Name" onChange = { handleChange }></input>
            <input type="text" name = "email" value = {user.email} placeholder="Your Email" onChange = { handleChange }></input>
            <input type="password" name = "password" value = {user.password} placeholder="Password" onChange = { handleChange }></input>
            <button className="button" onClick = {signUp}>Signup</button>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    )
};
// export default Signup;