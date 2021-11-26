import react, {useState} from "react";
import './login.css'

const Login = () =>{

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

    return (
        <div className="login">
            {console.log("user", user)}
            <h1>Login</h1>
            <input type="text" name = "email" value = {user.email} onChange = { handleChange } placeholder="Enter your Email"></input>
            <input type="text" name = "password" value = {user.password} onChange = { handleChange } placeholder="Enter the password"></input>
            <button className="button">Login</button>
            <div>or</div>
            <div className="button">Signup</div>
        </div>
    )
}

export default Login;