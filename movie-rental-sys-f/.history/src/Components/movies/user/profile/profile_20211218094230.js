import React, {useState, useEffect} from "react";
import axios from "axios";
import './profile.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function UserProfile(){
    const navigate = useNavigate()

    let [userDetails, setUserDetails] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);

    useEffect(()=>{
        axios.get('/view-profile', {headers: {cookie: cookies}})
        .then((response) => {
            console.log("hiii",response.data.view_profile);
            setUserDetails(response.data.view_profile);
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

    console.log(userDetails.length);

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
                    }else if(data.length === 1){
                        return(
                            <div className="col-md-3" key={data[0]._id}>
                                <div className ="card">
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="data-title" >{data[0].user_id.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="email">Email: {data[0].user_id.email}</p>
                                        <p className ="role">Role: {data[0].user_id.role}</p>
                                        <p className ="rents">Total rents: {data[0].user_id.rent}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }else{
                        <div className="col-md-3" key={data._id}>
                            <div className ="card">
                                <div className="card-header text-center card-header-color" >
                                    <h5 className="data-title" >{data[0].user_id.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="email">Email: {data[0].user_id.email}</p>
                                    <p className ="role">Role: {data[0].user_id.role}</p>
                                    <p className ="rents">Total rents: {data[0].user_id.rent}</p>
                                </div>
                            </div>
                        </div>
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