import { TOGGLE_FAVORITE, CREATE_FILM, SET_FILMS, DELETE_FILM, UPDATE_FILM } from '../actions/films';

import Film from '../../models/film';

const initialState = {
    films: [],
    filteredFilms: [],
    favoriteFilms: []
}

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const index = state.favoriteFilms.findIndex(film => film.id === action.filmId);
            if (index >= 0) {
                const updatedFavFilms = [...state.favoriteFilms];
                updatedFavFilms.splice(index, 1)
                return { ...state, favoriteFilms: updatedFavFilms }
            } else {
                const newFavFilm = state.films.find(film => film.id === action.filmId)
                return { ...state, favoriteFilms: state.favoriteFilms.concat(newFavFilm) }
            }
        case SET_FILMS:
            return {
                ...state,
                films: action.films,
                userFilms: action.films
            }
        case CREATE_FILM:
            const newFilm = new Film(
                action.filmData.id,
                action.filmData.categoryIds,
                action.filmData.title,
                action.filmData.duration,
                action.filmData.imdbScore,
                action.filmData.year,
                action.filmData.director,
                action.filmData.stars,
                action.filmData.imageUrl
            );
            return {
                ...state,
                films: state.films.concat(newFilm)
            }
        case UPDATE_FILM:
            const userFilmIndex = state.userFilms.findIndex(film => film.id === action.pid);
            const filmIndex = state.films.findIndex(film => film.id === action.pid);

            const updatedFilm = new Film(
                action.pid,
                action.filmData.categoryIds,
                action.filmData.title,
                action.filmData.duration,
                action.filmData.imdbScore,
                action.filmData.year,
                action.filmData.director,
                action.filmData.stars,
                action.filmData.imageUrl
            );

            console.log(action.filmData.year)

            const updatedUserFilms = [...state.userFilms];
            updatedUserFilms[userFilmIndex] = updatedFilm;

            const updatedFilms = [...state.films];
            updatedFilms[filmIndex] = updatedFilm;

            console.log(updatedFilms)
            console.log(updatedUserFilms)

            return {
                ...state,
                films: updatedFilms,
                userFilms: updatedUserFilms
            }

        case DELETE_FILM:
            return {
                ...state,
                userFilms: state.userFilms.filter(film => film.id !== action.id),
                films: state.films.filter(film => film.id !== action.id)
            }
        default:
            return state;
    }
}

export default filmReducer;