import React, {useState, useEffect} from "react";
import axios from "axios";
import './profile.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import * as moment from "moment";

let check = false;
export default function UserProfile(){
    const navigate = useNavigate()

    let [userDetails, setUserDetails] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);

    useEffect(()=>{
        axios.get('/view-profile', {headers: {cookie: cookies}})
        .then((response) => {
            console.log("hiii",response);
            if(response.data.length === 1){
                setUserDetails(response.data.userInfo);
            }else{
                setUserDetails(response.data.view_profile);
            }
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
                {userDetails.map((data) =>{
                    if(data === "no_user"){
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
                    }else if(userDetails.length === 1){
                        return(
                            <div className="col-md-3" key={data[0]._id}>
                                <div className ="card">
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="data-title" >{data[0].name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="email">Email: {data[0].email}</p>
                                        <p className ="role">Role: {data[0].role}</p>
                                        <p className ="rents">Total rents: {data[0].rent}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }else{
                        if(!check){
                            check = true
                            return (
                                <div className="col-md-3" key={data[0]._id}>
                                    <div className ="card">
                                        <div className="card-header text-center card-header-color" >
                                            <h5 className="data-title" >{data[0].name}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="email">Email: {data[0].email}</p>
                                            <p className ="role">Role: {data[0].role}</p>
                                            <p className ="rents">Total rents: {data[0].rent}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }if(check){
                            return (
                                data.map((movie)=>{
                                    return (
                                        <div className="col-md-3" key={movie._id}>
                                            <div className ="card">
                                                <div className="card-header text-center card-header-color" >
                                                    <h5 className="data-title" >{movie.name}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p className="genre">genre: {movie.genre}</p>
                                                    <p className ="releasDate">releasDate: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                                    <p className ="avalCD">Total rents: {movie.avalCD}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    }
                    })}
                </div>
            </div>
            <div className="container">
                <div className="button text-center" onClick = {()=>{
                    navigate("/user-movie-page")
                }}>Movies</div>
            </div>
        </>
    )
}