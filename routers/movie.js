const express = require('express');

const router = express.Router();

const moviesController = require('../controllers/movie');

//Authorization
router.use(moviesController.isAuth)

//Trending
router.get('/movies/trending', moviesController.getMoviesTrending)

//Rating
router.get('/movies/top-rate', moviesController.getMoviesRating);

//Genre
router.get('/movies/discover', moviesController.getGenre)

//Trailer
router.post('/movies/video', moviesController.postVideoTrailer)

//Search
router.post('/movies/search', moviesController.postSearch)

//Advance Search
router.get('/movies/genrelist', moviesController.getGenreList)


module.exports = router;