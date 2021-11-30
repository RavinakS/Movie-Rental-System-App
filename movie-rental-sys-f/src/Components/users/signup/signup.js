import React, {useState} from "react";
import './signup.css';
import axios from "axios";

const Signup = () =>{

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
        // reEnterPassword: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signUp = () =>{
        const {name, email, password} = user;
        if(name && email && password){
            // alert("posted");
            axios.post("http://localhost:3040/create-account", user)
            .then((res)=>{
                alert(res.data.message);
            }).catch(error =>  console.error(error))
        }else{
            alert("Invalid Inputs");
        }

    }

    return (
        <div className="signup">
            {console.log("user", user)}
            <h1>Signup</h1>
            <input type="text" name = "name" value = {user.name} placeholder="Your Name" onChange = { handleChange }></input>
            <input type="text" name = "email" value = {user.email} placeholder="Your Email" onChange = { handleChange }></input>
            <input type="text" name = "password" value = {user.password} placeholder="Password" onChange = { handleChange }></input>
            {/* <input type="text" name = "reEnterPassword" value = {user.reEnterPassword} placeholder="Re-enter Password" onChange = { handleChange }></input> */}
            <button className="button" onClick = {signUp}>Signup</button>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    )
}

export default Signup;