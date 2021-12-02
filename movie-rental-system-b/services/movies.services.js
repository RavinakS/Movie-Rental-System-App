const { movies } = require('../model/movies.model');

exports.allMovies = () =>{
    return movies.find();
}

exports.addMovie = (movieData) =>{
    return movies.create(movieData);
}

exports.searchMovie = (identity) =>{
    return movies.find();
}

exports.avalRentsMovieByName = (m_name) =>{
    return movies.findOne({name: m_name}, {avalCD:1});
}

exports.getMovieByName = (m_name) =>{
    return movies.findOne({name: m_name});
}

exports.updateMovie = (m_name, m_details) =>{
    return movies.updateOne({name: m_name}, {$set: m_details});
}

exports.deleteMovie = (m_name) =>{
    return movies.deleteOne({name: m_name});
}
