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

    check = 

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
                            <div className="col-md-3" key={userDetails[0][0]._id}>
                                <div className ="card">
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="data-title" >{userDetails[0][0].name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="email">Email: {userDetails[0][0].email}</p>
                                        <p className ="role">Role: {userDetails[0][0].role}</p>
                                        <p className ="rents">Total rents: {userDetails[0][0].rent}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }else{

                    }
                    // else if(){
                    //     <div className="col-md-3" key={data._id}>
                    //         <div className ="card">
                    //             <div className="card-header text-center card-header-color" >
                    //                 <h5 className="data-title" >{data[0][0].name}</h5>
                    //             </div>
                    //             <div className="card-body">
                    //                 <p className="email">Email: {data[0][0].email}</p>
                    //                 <p className ="role">Role: {data[0][0].role}</p>
                    //                 <p className ="rents">Total rents: {data[0][0].rent}</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    // }
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