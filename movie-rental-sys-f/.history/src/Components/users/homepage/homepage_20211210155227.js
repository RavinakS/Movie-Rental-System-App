import React, {useEffect} from "react";
import './homepage.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";

const Homepage = () =>{
    let navigate = useNavigate();
    
    let [cookies, setCookie] = useCookies(['token']);

    let logout = async () => {
        await setCookie('token', null);
        console.log("in logout section.");

        navigate('/login');
        return;
    }

    useEffect(, []);

    let checkUser = async () => {
        await setCookie('token', cookies);

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

    useEffect(checkUser, []);

    return (
        <div className="App">
            <div className="homepage">
                <h1 className="text-center text-warning my-5" > ** You're Well Come To Home-Page **</h1>
                <div className="button" onClick={()=>logout}>Logout</div>
                <div className="button" onClick={()=>checkUser} >Admin Movie Page</div>
                <div className="button" onClick={()=>checkUser} >User Movie Page</div>
            </div>
        </div>
    )
}

export default Homepage;