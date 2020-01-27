import { FILMS } from '../../constants/categories';
import { TOGGLE_FAVORITE, CREATE_FILM, SET_FILMS } from '../actions/films';

import Film from '../../models/film';

const initialState = {
    films: FILMS,
    filteredFilms: FILMS,
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
                action.productData.id,
                ["c1"],
                action.productData.title,
                action.productData.duration,
                action.productData.imdbScore,
                action.productData.year,
                action.productData.director,
                ["Al Pacino", "YYY"],
                action.productData.imageUrl
            );
            return {
                ...state,
                films: state.films.concat(newFilm)
            }
        default:
            return state;
    }
}

export default filmReducer;