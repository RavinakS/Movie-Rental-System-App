import React, {useState, useEffect} from "react";
import axios from "axios";
import './allUsers.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";


export default function AllUsers(){
    let navigate = useNavigate();

    let [users, setUsers] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);
    const 


    let usersPage = () =>{
        axios.get('/view-users-data', {headers: {cookie: cookies}})
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        usersPage();
    }, []);

    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >All Users</h1>
            </header>
            <div className="container">
                <div className="row">
                {users.map((user) =>{
                    return(
                        <div className="col-md-3" key={user._id}>
                            <div className ="card">
                                <div className="card-header text-center card-header-color" >
                                    <h5 className="movie-title" >{user.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="email">Email: {user.email}</p>
                                    <p className ="role">Role: {user.role}</p>
                                    <p className="rents">Rents: {user.rent}</p>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
            <div className="container">
                <div className="button text-center" onClick = {()=>{
                    navigate("/admin-movie-page")
                }}>Movies</div>
            </div>
        </>
    )
}

