const { movies } = require('../model/movies.model');

exports.getAllMovies = function(){
    return movies.find({});
}
