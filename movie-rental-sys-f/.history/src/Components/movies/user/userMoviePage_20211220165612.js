import React, {useState, useEffect} from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './userMoviePage.css';
import axios from "axios";
import * as moment from "moment";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Swal2 from "sweetalert2";
import ReactPaginate from "react-paginate";

export default function UserMoviepage(){
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const moviesPerPage = 12;
    const pagesVisited = moviesPerPage * pageNumber;
    const pageCount = Math.ceil(movies.length / moviesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const sortByReleasDate = () =>{
        axios.get('/sort-movies')
        .then((response) =>{
            setMovies(response.data.slice(0, response.data.length));
        })
        .catch((err) =>{ 
            Swal2.fire({
                icon : "error",
                title : err.response.data
            })
        })
    }
    
    const displayMovies = movies
        .slice(pagesVisited, pagesVisited + moviesPerPage)
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
                            <button className="btn btn-primary" onClick={() => {handleClick(movie.name)}}>Rent</button>
                        </div>
                    </div>
                </div>
            )
        }));

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            return setMovies(response.data.data);
        })
        .catch(err => alert(err.response))
    }

    let handleClick = (m_name) => {
        const response = axios.post(`/rent-movie/${m_name}`, {headers: {cookie: cookies}})
        .then((res)=>{
            Swal2.fire({
                icon : "success",
                title : "Congratulations!! Enjoy your movie :)"
            })
            moviePage();
        })
        .catch((err) =>{
            if(err.response.status === 404){
                navigate('/login')
            }else if(err.response.status === 403){
                Swal2.fire({
                    icon : "error",
                    title : "You already have the movie. please check your profile."
                })
                moviePage();
            }else if(err.response.status === 503){
                Swal2.fire({
                    icon : "error",
                    title : "This Movie is now not available for rent."
                })
                moviePage();
                console.log(err)
            }
        })
        console.log("response", response);
    }

    useEffect(moviePage, []);

    return (
        <>
            <header>
                <h1 className="text-center text-success my-15" >Movies</h1>
                <div className="container"> 
                    <input 
                        type="text" 
                        id="search" 
                        placeholder="Search...." 
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} 
                    /> 
                    <button 
                        className="btn btn-primary" 
                        id="sortByReleasDate" 
                        style={{'margin-right': '365px'}} 
                        onClick={() => {sortByReleasDate()}}
                        >Sort
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

