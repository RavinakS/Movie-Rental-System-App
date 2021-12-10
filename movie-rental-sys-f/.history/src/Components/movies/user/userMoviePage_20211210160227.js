import React, {useState, useEffect} from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import * as moment from "moment";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function UserMoviepage(){
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);

    let checkUser = () => {
        setCookie('token', cookies);

        axios.post('/get-token', {headers: {cookie: cookies}})
        .then((res)=>{
            if(res.data === 'noToken'){
                navigate('/login');
            }
            else if(res.data === true){
                navigate('/admin-movie-page');
            }else{
                navigate('/user-movie-page');
            }
        })
    }

    useEffect(()=>{
        checkUser();
        
    }, []);

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            return setMovies(response.data.data);
        })
        .catch(err => alert(err.response))
    }

    useEffect(moviePage, []);

    return (
        <>
            <header>
                <h1 className="text-center text-success my-5" >Movies</h1>
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
                                    <button className="btn btn-primary" onClick={() => {navigate('/rent')}}>Rent</button>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}

