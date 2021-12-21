import axios from "axios";
import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import navButtons from "../../helper/nav";

const Login = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = event => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {
        let { email, password } = user;
        if (email && password) {
            try {
                let res = await axios.post('/login', user);

                Swal2.fire({
                    icon : "success",
                    title : "Logged in Successfully."
                })

                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("role", res.data.role);

                navigate('/user-movie-page');
                
            } catch (err) {
                Swal2.fire({
                    icon : "error",
                    title : err.response.data.message
                })
            }
        }
    }

    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="collapse navbar-collapse">
            {navButtons()}
          </div>
      </nav>
        </>
        
    )
}

export default Login;