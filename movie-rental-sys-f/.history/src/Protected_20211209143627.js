import React, {useState, useEffect} from "react";
import './signup.css';
import '../../../App.css';
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

    return (
        <div>
        </div>
    )
};