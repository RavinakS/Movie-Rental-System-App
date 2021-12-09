const {allMovies, addMovie, searchMovie, updateMovie, deleteMovie, getMovieByName} = require('../services/movies.services');
const {responses, error_messages} = require('../controller/utils/constants');
const {verifyToken} = require('./utils/token');

exports.search_movie = async (req, res) =>{
    data = req.query;
    for(let key in data){
        search_data = data[key];
        if(search_data !== undefined){
            try{
                var movies = await searchMovie(search_data);
                res.send(movies);
            }catch(err){
                return res.send(err);
            }
        }
    }
    size = Object.keys(req.query).length;
    if(size === 0){
        res.status(400).send(error_messages.required);
    }else if(not_found > 0){
        res.status(404).send(error_messages.not_exist);
    }
}


exports.all_movies = async (req, res) =>{
    movies = await allMovies();
    res.status(200).send({status_code: 200, data: movies});
}


exports.add_movie = async (req, res) =>{
    movieDetails = req.admin;
    try{
        added = await addMovie(movieDetails);
        res.status(201).send(responses.succeeded);
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){ 
            return res.status(500).send(error_messages.server_error);
        }
        return res.send(err);
    }

}

exports.update_movie = async (req, res) =>{
    try{ 
        let {name, releasDate, genre, avalCD} = req.query;
        movieDetails = await getMovieByName(name);
        if(movieDetails===null){
            return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."})
        }
        let rents = movieDetails.avalCD;
        let newRents = parseInt(avalCD);
        if(newRents >= rents){
            let updates = {
                name: name,
                releasDate: releasDate, 
                genre: genre,
            }
            update = await updateMovie(name, updates, newRents);
            // if(update.matchedCount===0){
            //     return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."})
            // }
            res.status(201).send({status_code: 201, message: "Updated Successfully."});
        }else{
            res.status(408).send({status_code: 408, message: `available CDs should be >= ${rents}`});
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.delete_movie = async (req, res) =>{
    try{
        movieName = req.params.name;
        delete_movie = await deleteMovie(movieName);
        if(delete_movie.deletedCount === 0){
            return res.status(404).send({status_code: 404, message: "Couldn't find the movie."});
        }
        res.status(201).send({status_code: 201, message: "Have Successfully Deleted the Movie"});

    }catch(err){
        console.log(err);
        res.send(err)
    }
}

exports.get_token = async (req, res) =>{
    try{
        let token = req.headers.cookie.split('=')[1];
        console.log(token);
        userInfo = await verifyToken(token);
        user_role = userInfo.role.toLowerCase();
        if(user_role === 'admin'){
            res.send(true);
            return;
        }else{
            res.send(false);
            return;
        }
    }catch(err){
        console.log(err);
        res.send("token_not_found");
    }
}