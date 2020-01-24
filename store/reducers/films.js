import { FILMS } from '../../constants/categories';

const initialState = {
    films: FILMS,
    filteredFilms: FILMS,
    favoriteMeals: []
}

const filmReducer = (state = initialState, action) => {
    switch(action.type) {

    }

    return state;
}

export default filmReducer;