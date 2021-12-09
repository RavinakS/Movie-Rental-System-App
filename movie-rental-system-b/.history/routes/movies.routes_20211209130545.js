const {all_movies, add_movie, search_movie, update_movie, delete_movie} = require('../controller/movies.controller');
const {user_auth_for_movie, auth_for_users} = require('../controller/middlewares/user_auth');
const {movieValidation} = require('../controller/utils/schemaValidation');
const {}

const express = require('express');
const router = express.Router();

//view all movies
router.get('/all-movies', all_movies);

// add a new movie
router.post('/add-movie', user_auth_for_movie, movieValidation, add_movie);

// search movie with a genere
router.get('/search', search_movie);

// update movie details
router.put('/update-movie', user_auth_for_movie, movieValidation, update_movie);

//delete a movie
router.delete('/delete-movie/:name', delete_movie);
// router.delete('/delete-movie/:name', delete_movie);

router.post('/get-token', get_token);

module.exports = router;