import React, {useState, useEffect} from "react";
import axios from "axios";
import './rents.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function UserProfile(){
    const navigate = useNavigate()
    const name = new URLSearchParams(search).get('name');

    let [userDetails, setUserDetails] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);

    useEffect(()=>{
        axios.get('/view-profile', {headers: {cookie: cookies}})
        .then((response) => {
            console.log("hiii",response.data);
            setUserDetails(response.data);
        })
        .catch((err) =>{
            try{
                console.log(err.response);
                if(err.response.data.message === "No Rents"){
                    setUserDetails(["No Rents"]);
                }
            }catch(err){
                console.log(err);
            }
        })
    }, [])

    return (
        <>
            <header>
                <h1 className="text-center text-muted my-5" >Your Profile</h1>
            </header>
            <div className="container">
                <div className="row">
                {userDetails.map((movie) =>{
                    if(movie === "no_user"){
                        return (
                            <div className ="card border-warning">
                                <div className="card-body bg-">
                                    <p className="text-center text-danger">No Rents</p>
                                </div>
                                <div className="button text-center" onClick = {()=>{
                                    navigate("/login")
                                }}>Login</div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="col-md-3" key={movie._id}>
                                <div className ="card">
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="movie-title" >{movie.user_id.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="email">Email: {movie.user_id.email}</p>
                                        <p className ="role">Role: {movie.user_id.role}</p>
                                        <p className ="rents">Total rents: {movie.user_id.rent}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }})}
                </div>
            </div>
            <div className="container">
                <div className="button text-center" onClick = {()=>{
                    navigate("/admin-movie-page")
                }}>Back</div>
            </div>
        </>
    )
}