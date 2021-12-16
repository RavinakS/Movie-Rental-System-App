import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Col } from "react-bootstrap";

export default function AdminMoviepage(){
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    let [state, setState] = useState({});

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data);
        })
        .catch(err => alert(err.response))
    }

    useEffect(()=>{
        moviePage();
        return () =>{
            return setState({});
        }
    }, []);


    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >Movies</h1>
                <div className="container">
                    <Col className="btn btn-primary" md={{ span: 2, offset: 10 }} onClick={() => {navigate('/movies/add-movie')}}>Add Movie</Col>   
                </div>
            </header>
            <div className="container">
                <div className="row">
                {movies.map((movie) =>{
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
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}