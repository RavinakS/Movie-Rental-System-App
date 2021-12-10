import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Col } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function AdminMoviepage(){
    let navigate = useNavigate();

    let [movies, setMovies] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);
    let [state, setState] = useState({});

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
        return ()
    }, []);

    let moviePage = () =>{
        axios.get('/all-movies')
        .then((response) => {
            setMovies(response.data.data);
        })
        .catch(err => alert(err.response))
    }

    useEffect(moviePage, []);

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
                <div className="container">
                    <Col className="btn btn-primary" md={{ span: 2, offset: 10 }} onClick={() => {navigate('/add-movie')}}>Add Movie</Col>   
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
                                    <button className="btn btn-primary" onClick={() => {navigate('/update')}}>Update</button>
                                    <button className="btn btn-primary" onClick={() => {handleClick(movie.name)}} >Delete</button>
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

