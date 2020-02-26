import { TOGGLE_FAVORITE, CREATE_MEAL, SET_MEALS, DELETE_MEAL, UPDATE_MEAL } from '../actions/meals';

import Meal from '../../models/meal';

const initialState = {
    meals: [],
    userMeals: [],
    favoriteMeals: []
}

const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const index = state.favoriteMeals.findIndex(film => meal.id === action.mealId);
            if (index >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(index, 1)
                return { ...state, favoriteMeals: updatedFavMeals }
            } else {
                const newFavMeal = state.films.find(film => film.id === action.filmId)
                return { ...state, favoriteMeals: state.favoriteMeals.concat(newFavMeal) }
            }
        case SET_MEALS:
            return {
                ...state,
                meals: action.meals,
                userMeals: action.userMeals
            }
        case CREATE_MEAL:
            const newMeal = new Meal(
                action.mealData.id,
                action.mealData.categoryIds,
                action.mealData.title,
                action.mealData.ingredients,
                action.mealData.steps,
                action.mealData.score,
                action.mealData.duration
            );
            return {
                ...state,
                meals: state.meals.concat(newMeal)
            }
        case UPDATE_MEAL:
            const userMealIndex = state.userMeals.findIndex(film => film.id === action.pid);
            const mealIndex = state.films.findIndex(film => film.id === action.pid);

            const updatedMeal = new Meal(
                action.pid,
                action.mealData.categoryIds,
                action.mealData.title,
                action.mealData.duration,
                action.mealData.ingredients,
                action.mealData.steps,
                action.mealData.score
            );

            const updateduserMeals = [...state.userMeals];
            updateduserMeals[userMealIndex] = updatedMeal;

            const updatedMeals = [...state.meals];
            updatedMeals[mealIndex] = updatedMeal;

            return {
                ...state,
                meals: updatedMeals,
                userMeals: updateduserMeals
            }

        case DELETE_MEAL:
            return {
                ...state,
                userMeals: state.userMeals.filter(meal => meal.id !== action.id),
                meals: state.meals.filter(meal => meal.id !== action.id)
            }
        default:
            return state;
    }
}

export default mealReducer;