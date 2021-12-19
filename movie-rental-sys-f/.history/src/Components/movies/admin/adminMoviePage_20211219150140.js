import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function AdminMoviepage(){
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    let [state, setState] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    const moviesPerPage = 12;
    const pagesVisited = moviesPerPage * pageNumber;
    const pageCount = Math.ceil(movies.length / moviesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const displayMovies = movies
        .slice(pagesVisited, pagesVisited + moviesPerPage)
        .map((movie => {
            
        }));

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data.slice(0, response.data.length));
        })
        .catch(err => alert(err.response.data))
    }

    useEffect(()=>{
        moviePage();
        return () =>{
            return setState({});
        }
    }, []);

    let handleClick = (m_name) => {
        console.log("movieName is:", m_name);
        axios.delete(`/delete-movie/${m_name}`)
        .then((res)=>{
            if(res.data === "token_not_found"){
                navigate('/login');
            }else{
                alert("Successfully Deleted");
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
                <h1 className="text-center text-success my-5" >Movies</h1>
                <div className="container" style={{ display: "flex", justifyContent: 'flex-end'}}>
                    <button className="btn btn-primary" id="admin" style={{'margin-right': '1120px'}} onClick={() => {navigate('/users')}}>Users</button>   
                    <button className="btn btn-primary" id="admin" style={{'margin-right': '5px'}} onClick={() => {navigate('/movies/add-movie')}}>Add Movie</button>
                </div>
            </header>
            <div className="container">
                <div className="row">
                {movies.map((movie) =>{
                    })}
                </div>
            </div>
        </>
    )
}

