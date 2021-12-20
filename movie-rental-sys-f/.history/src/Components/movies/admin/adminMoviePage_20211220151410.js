import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal2 from "sweetalert2";

export default function AdminMoviepage(){
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [state, setState] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByDate, setSsortByDate] = useState("");

    const moviesPerPage = 12;
    const pagesVisited = moviesPerPage * pageNumber;
    const pageCount = Math.ceil(movies.length / moviesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const displayMovies = movies
        .slice(pagesVisited, pagesVisited + moviesPerPage)
        .sort
        .filter((movie) =>{
            console.log(movie.name);
            if(movie){
                if(searchTerm === ""){
                    return movie;
                }else if(movie.name != undefined){
                    if(movie.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return movie;
                    }
                }
            }
        })
        .map((movie => {
            return(
                <div className="col-md-3" key={movie._id}>
                    <div className ="card">
                        <div className="card-header text-center card-header-color" >
                            <h5 className="movie-title" >{movie.name}</h5>
                        </div>
                        <div className="card-body">
                            <p className="release-date">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                            <p className="genre">Genre: {movie.genre}</p>
                            <p className ="Available rents">Available rents: {movie.avalCD}</p>
                            <button className="btn btn-primary" onClick={() => {navigate('/movies/update-movie')}}>Update</button>
                            <button className="btn btn-primary" onClick={() => {handleClick(movie.name)}} >Delete</button>
                            <Link to={{pathname: `${'/rent-details'}?name=${movie.name}`}}>
                                <button className="btn btn-primary">Rent Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }));

    const moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data.slice(0, response.data.length));
        })
        .catch((err) =>{ 
            Swal2.fire({
                icon : "error",
                title : err.response.data
            })
        })
    }

    useEffect(()=>{
        moviePage();
        return () =>{
            return setState({});
        }
    }, []);

    const handleClick = (m_name) => {
        console.log("movieName is:", m_name);
        axios.delete(`/delete-movie/${m_name}`)
        .then((res)=>{
            if(res.data === "token_not_found"){
                navigate('/login');
            }else{
                Swal2.fire({
                    icon : "success",
                    title : "Successfully Deleted"
                })
                moviePage();
            }
        })
        .catch((err) =>{
            if(err === "token_not_found"){
                navigate('/login')
            }else{
                console.log(err)
            }
        })
    }

    return (
        <>
            <header>
                <h1 className="text-center text-success my-15">Movies</h1>
                <div className="container">
                    <button 
                        className="btn btn-primary" 
                        id="admin" 
                        style={{'margin-right': '5px'}} 
                        onClick={() => {navigate('/users')}}
                        >Users
                    </button>
                    <button 
                        class="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenu2" 
                        style={{'margin-right': '310px'}}
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                        onClick={setSort("date")}>
                        Short
                    </button>
                    {/* <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button">by Name</button>
                        <button class="dropdown-item" type="button">by Release Date</button>
                        <button class="dropdown-item" type="button">by Rents</button>
                    </div> */}
                    <input 
                        type="text" 
                        id="search" 
                        style={{'margin-right': '399px'}} 
                        placeholder="Search...." 
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} 
                    /> 
                    <button 
                        className="btn btn-primary" 
                        id="admin" 
                        style={{'margin-right': '5px'}} 
                        onClick={() => {navigate('/movies/add-movie')}}>
                        Add Movie
                    </button>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    {displayMovies}
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
        </>
    )
}

