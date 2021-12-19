import React, {useState, useEffect} from "react";
import axios from "axios";
import './allUsers.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";


export default function AllUsers(){
    let navigate = useNavigate();

    let [users, setUsers] = useState([]);
    let [state, setState] = useState({});
    let [cookies, setCookie] = useCookies(['token']);


    let moviePage = () =>{
        axios.get('//view-users-data', {headers: {cookie: cookies}})
        .then((response) => {
            setUsers(response.data);
        })
        .catch(err => alert(err.response.data))
    }

    useEffect(()=>{
        moviePage();
        return () =>{
            return setState({});
        }
    }, []);

    // let handleClick = (m_name) => {
    //     console.log("movieName is:", m_name);
    //     axios.delete(`/delete-movie/${m_name}`)
    //     .then((res)=>{
    //         if(res.data === "token_not_found"){
    //             navigate('/login');
    //         }else{
    //             alert("Successfully Deleted");
    //             moviePage();
    //         }
    //     })
    //     .catch((err) =>{
    //         if(err === "token_not_found"){
    //             navigate('/login')
    //         }else{
    //             console.log(err)
    //         }
    //     })
    // }

    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >All Users</h1>
            </header>
            <div className="container">
                <div className="row">
                {users.map((user) =>{
                    return(
                        <div className="col-md-3" key={movie._id}>
                            <div className ="card">
                                <div className="card-header text-center card-header-color" >
                                    <h5 className="movie-title" >{user.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="genre">Email: {user.email}</p>
                                    <p className ="Available rents">Role: {user.role}</p>
                                    <button className="btn btn-primary">Rents: {user.rent}</button>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}

