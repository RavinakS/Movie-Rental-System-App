import React, {useState, useEffect} from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import * as moment from "moment";
// import { useNavigate } from "react-router";

export default function UserMoviepage(){
    // let navigate = useNavigate();

    let [movies, setMovies] = useState([]);

    useEffect(()=>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data);
        })
        .catch(err => alert(err.response))

    }, [])
    console.log(movies);

    return (
    <>
        <h1 className="text-center text-success my-5" >Movies</h1>
            <div className="container">
                <div className="row">
                {movies.map((movie) =>{
                    return(
                        <div className="col-md-3" key={movie._id}>
                            <div className ="card">
                                <div className="card-body">
                                    <h5 className="movie-title" >Movie: {movie.name}</h5>
                                    <p className="release-date">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                    <p className="genre">Genre: {movie.genre}</p>
                                    <a href="#" className="btn btn-primary">Available rents: {movie.avalCD}</a>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}

