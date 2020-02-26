export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const CREATE_MEAL = 'CREATE_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const SET_MEALS = 'SET_MEALS';
export const DELETE_MEAL = 'DELETE_MEAL';

import Meal from '../../models/meal';

export const toggleFav = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id }
}

export const fetchMeals = () => {
    return async (dispatch, getState) => {
        const userId = getState().authReducer.userId;

        const response = await fetch(
            'https://films-a6c4d.firebaseio.com/meals.json'
        );

        const resData = await response.json();
        const loadedMeals = [];

        for (const key in resData) {
            loadedMeals.push(new Meal(
                key,
                resData[key].categoryIds,
                resData[key].title,
                resData[key].ingredients,
                resData[key].duration,
                resData[key].steps,
                resData[key].score,
                resData[key].ownerId
            ))
        }

        dispatch({ type: SET_MEALS, meals: loadedMeals, userMeals: loadedMeals.filter(meal => meal.ownerId === userId ) })

    }
}

export const createMeal = (title, duration, categoryIds, ingredients, steps, score) => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;
        const userId = getState().authReducer.userId;

        const response = await fetch(`https://films-a6c4d.firebaseio.com/meals.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({
                categoryIds,
                title,
                duration,
                ingredients,
                steps,
                score,
                ownerId: userId
            })
        })

        const resData = await response.json();

        dispatch({
            type: CREATE_MEAL,
            mealData: {
                id: resData.name,
                categoryIds,
                title,
                duration,
                ingredients,
                steps,
                score

            }
        })
    }
}

export const updateMeal = (id, title, duration, ingredients, steps, score, categoryIds) => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;
        
        const response = await fetch(`https://films-a6c4d.firebaseio.com/meals/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({
                title,
                duration,
                ingredients,
                steps,
                score,
                categoryIds
            })
        })

        dispatch({
            type: UPDATE_MEAL,
            pid: id,
            filmData: {
                categoryIds,
                title,
                duration,
                ingredients,
                steps,
                score
            }
        })
    }
}

export const deleteMeal = mealId => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;

        await fetch(`https://films-a6c4d.firebaseio.com/meals/${mealId}.json?auth=${token}`, {
            method: 'DELETE'
        })

        dispatch({ type: DELETE_MEAL, id: mealId })
    }
}