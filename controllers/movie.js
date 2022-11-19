const MoviesList = require('../models/moviesList');
const GenreList = require('../models/genreList')
const VideoList = require('../models/videoList')
const UserToken = require('../models/userToken')
const Pagination = require('../utils/paging')


//Trending
exports.getMoviesTrending = (req, res, next) => {
    MoviesList.sort((a, b) => b.popularity - a.popularity);
    const pageCheck = parseInt(req.query.page);
    let page;
    if (!pageCheck) {
        page = 1;
    }
    else {
        page = pageCheck;
    }
    const resultTrending = Pagination(MoviesList, page);
    res.status(200).json({
        results: resultTrending,
        page: page,
        total_pages: MoviesList.length / limit
    })
}


//Rating
exports.getMoviesRating = (req, res, next) => {
    MoviesList.sort((a, b) => b.vote_average - a.vote_average);
    const pageCheck = parseInt(req.query.page);
    let page;
    if (!pageCheck) {
        page = 1;
    }
    else {
        page = pageCheck;
    }
    const resultRating = Pagination(MoviesList, page);
    res.status(200).json({
        results: resultRating,
        page: page,
        total_pages: MoviesList.length / limit
    })
}



//Genre_name
exports.getGenre = (req, res, next) => {
    const pageCheck = parseInt(req.query.page);
    const genreCheck = parseInt(req.query.genre);
    let page;
    if (!genreCheck) {
        res.status(400).json({ message: 'Not found gerne parram' })
    }
    else {
        const genreExist = GenreList.find(element => element.id === genreCheck)
        if (genreExist) {
            if (!pageCheck) {
                page = 1;
            }
            else {
                page = pageCheck;
            }
            const MovieGenre = MoviesList.filter(movie => movie.genre_ids && movie.genre_ids.includes(genreCheck))
            const genre_name = GenreList.find(element => element.id === genreCheck)
            const resultGenre = Pagination(MovieGenre, page)
            res.status(200).json({
                results: resultGenre,
                page: page,
                total_pages: MovieGenre.length / limit,
                genre_name: genre_name && genre_name.name
            })
        }
        else {
            res.status(400).json({ message: 'Not found that gerne id' })
        }
    }
}


//Trailer
exports.postVideoTrailer = (req, res, next) => {
    const filmId = parseInt(req.body.film_id);
    if (!filmId) {
        res.status(400).json({ message: 'Not found film_id parram' })
    }
    else {
        const film = VideoList.find(element => element.id === filmId);
        if (!film) {
            res.status(404).json({
                message: 'Not found video'
            })
        }
        else {
            const video = film.videos.filter(element => element.official === true && element.site === 'YouTube');
            video.sort((a, b) => {
                return (a.published_at > b.published_at) ? -1 : ((a.published_at < b.published_at) ? 1 : 0);
            })
            const trailer = video.filter(element => element.type === 'Trailer');
            const teaser = video.filter(element => element.type === 'Teaser')
            if (trailer.length > 0) {
                res.status(200).json(trailer[0])
            }
            else if (trailer.length === 0 && teaser.length > 0) {
                res.status(200).json(teaser[0])
            }
            else if (trailer.length === 0 && teaser.length === 0) {
                res.status(404).json({
                    message: 'Not found video'
                })
            }
        }
    }
}

//Search
exports.postSearch = (req, res, next) => {
    const keyword = req.body.keyword;
    const genre_ids = req.body.genre_ids;
    const language = req.body.language;
    const media_type = req.body.media_type;
    const year = req.body.year;
    const pageCheck = req.query.page;
    let page;
    let SearchMovie;
    if (keyword) {
        SearchMovie = MoviesList.filter(movie => movie.title && movie.title.toUpperCase().includes(keyword.toUpperCase()) || movie.name && movie.name.toUpperCase().includes(keyword.toUpperCase()))
        //genre
        if (genre_ids) {
            SearchMovie = SearchMovie.filter(movie => movie.genre_ids && movie.genre_ids.includes(genre_ids))
        }
        // media type
        if (media_type && media_type !== 'All') {
            SearchMovie = SearchMovie.filter(movie => movie.media_type && movie.media_type.toUpperCase() === media_type.toUpperCase());
        }
        //language
        if (language && language !== 'Select Language') {
            SearchMovie = SearchMovie.filter(movie => movie.original_language && movie.original_language.toUpperCase() === language.toUpperCase());
        }
        //year
        if (year) {
            SearchMovie = SearchMovie.filter(movie => movie.release_date && movie.release_date.includes(year));
        }
        else {
            SearchMovie = SearchMovie;
        }
        if (!pageCheck) {
            page = 1;
        }
        else {
            page = pageCheck
        }
        const resultSearch = Pagination(SearchMovie, page)
        res.status(200).json({
            results: resultSearch,
            page: page,
            total_pages: SearchMovie.length
        })
    }
    else {
        res.status(400).json({
            message: 'Not found keyword parram'
        })
    }
}

//Authorization
exports.isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenCheck = UserToken.find(e => e.token === token);
    if (!tokenCheck) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
    else {
        next();
    }
}


//get GenreList
exports.getGenreList = (req, res, next) => {
    res.status(200).json(GenreList)
}