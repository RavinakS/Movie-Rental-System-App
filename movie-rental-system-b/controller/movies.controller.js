const { movieValidation } = require('./utils/schemaValidation');
const {allMovies, addMovie, searchMovie, updateMovie, deleteMovie} = require('../services/movies.services');
const {responses, error_messages} = require('../controller/utils/constants');

exports.search_movie = async (req, res) =>{
    data = req.query;
    let not_found = 0
    let movie_array = []
    for(let key in req.query){
        search_data = req.query[key];
        if(search_data !== undefined){
            try{
                var movies = await searchMovie();
                if(movies.length === 0){
                    not_found = not_found + 1;
                }else if(movies.length > 0){
                    for(let movie in movies){
                        if(movie["name"]=== search_data){
                            movie_array.push(movie);
                        }if(movie["releasDate"] === search_data){
                            movie_array.push(movie);
                        }if(movie["genre"] === search_data){
                            movie_array.push(movie);
                        }
                    }
                    return res.status(200).send({status_code: 200, data: movies});
                }
            }catch(err){
                return res.send(err);
            }
        }
    }
    size = Object.keys(data).length;
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
    movieDetails = req.admin;

    validated = await movieValidation.validate(movieDetails);
    if(validated.error){
        return res.status(400).send({status_code: 400, error: validated.error.details[0].message});
    }

    try{
        update = await updateMovie(req.body.name, movieDetails);
        if(update.matchedCount===0){
            return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."})
        }
        res.status(201).send({status_code: 201, message: "Updated Successfully."});
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.delete_movie = async (req, res) =>{
    try{
        if(!req.admin){
            return res.status(401).send({status_code: 401, msg: "You don't have access to delete a movie."})
        }
        movieName = req.params.name;
        delete_movie = await deleteMovie(movieName);
        if(delete_movie.deletedCount === 0){
            return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."});
        }
        res.status(201).send({status_code: 201, message: "Have Successfully Deleted the Movie"});

    }catch(err){
        console.log(err);
        res.send(err)
    }
}
