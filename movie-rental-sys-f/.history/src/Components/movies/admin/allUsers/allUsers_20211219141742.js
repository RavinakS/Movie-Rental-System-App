import React, {useState, useEffect} from "react";
import axios from "axios";
import './allUsers.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";


export default function AllUsers(){
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 12;
    const pagesVisited = usersPerPage * pageNumber;

    const usersPage = () =>{
        axios.get('/view-users-data', {headers: {cookie: cookies}})
        .then((response) => {
            setUsers(response.data.slice(0, 500));
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const displayUsers = users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user => {
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
            )
        }));

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
                {displayUsers}
                <ReactPaginate
                    
                />
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

