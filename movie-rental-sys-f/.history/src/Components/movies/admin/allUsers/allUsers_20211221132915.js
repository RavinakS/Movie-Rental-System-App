import React, {useState, useEffect} from "react";
import axios from "axios";
import './allUsers.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";
import navButtons from "../../../helper/nav";

export default function AllUsers(){
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");


    const usersPerPage = 12;
    const pagesVisited = usersPerPage * pageNumber;
    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const usersPage = () =>{
        axios.get('/view-users-data', {headers: {cookie: cookies}})
        .then((response) => {
            setUsers(response.data.slice(0, response.data.length));
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const displayUsers = users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .filter((user) =>{
            console.log(user.name);
            if(user){
                if(searchTerm === ""){
                    return user;
                }else if(user.name != undefined){
                    if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return user;
                    }
                }
            }
        })
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
            <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
                <div class="collapse navbar-collapse">
                    {navButtons()}
                </div>
            </nav>
            <header>
                <h1 className="text-center text-success my-10" >All Users</h1>
                <div className="container"> 
                    <input 
                        type="text" 
                        id="search" 
                        placeholder="Search...." 
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} 
                    /> 
                </div> 
            </header>
            <div className="container">
                <div className="row">
                    {displayUsers}
                    <ReactPaginate
                        previousLabel = {"<<<"}
                        nextLabel = {">>>"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
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

