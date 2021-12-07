import React, {useState, useEffect} from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
// import { useNavigate } from "react-router";

export default function UserMoviepage(){
    // let navigate = useNavigate();

    let [movies, setMovies] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3040/all-movies')
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
                                <h5 className="movie-title" >{movie.name}</h5>
                                <p className="release-date">Date</p>
                                <p className="genre">Comedy</p>
                                <a href="#" className="btn btn-primary">Rent</a>
                            </div>
                            
                        </div>
                    </div>
                    )})}
                </div>
            </div>
        </>
    )
}

