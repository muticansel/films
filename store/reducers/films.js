import { FILMS } from '../../constants/categories';
import { TOGGLE_FAVORITE } from '../actions/films'

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
        default:
            return state;
    }
}

export default filmReducer;