import { TOGGLE_FAVORITE, CREATE_FILM, SET_FILMS } from '../actions/films';

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
        default:
            return state;
    }
}

export default filmReducer;