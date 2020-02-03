export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const CREATE_FILM = 'CREATE_FILM';
export const UPDATE_FILM = 'UPDATE_FILM';
export const SET_FILMS = 'SET_FILMS';
export const DELETE_FILM = 'DELETE_FILM';

import Film from '../../models/film';

export const toggleFav = (id) => {
    return { type: TOGGLE_FAVORITE, filmId: id }
}

export const fetchFilms = () => {
    return async (dispatch, getState) => {
        const userId = getState().authReducer.userId;

        const response = await fetch(
            'https://films-a6c4d.firebaseio.com/films.json'
        );

        const resData = await response.json();
        const loadedFilms = [];

        for (const key in resData) {
            loadedFilms.push(new Film(
                key,
                resData[key].categoryIds,
                resData[key].title,
                resData[key].duration,
                resData[key].imdbScore,
                resData[key].year,
                resData[key].director,
                ["Great Actor"],
                resData[key].imageUrl,
                resData[key].ownerId
            ))
        }

        dispatch({ type: SET_FILMS, films: loadedFilms, userFilms: loadedFilms.filter(film => film.ownerId === userId ) })

    }
}

export const createFilm = (title, duration, imdbScore, year, director, imageUrl, categoryIds) => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;
        const userId = getState().authReducer.userId;

        const response = await fetch(`https://films-a6c4d.firebaseio.com/films.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({
                categoryIds,
                title,
                duration,
                imdbScore,
                year,
                director,
                stars: ["Great Actor"],
                imageUrl,
                ownerId: userId
            })
        })

        const resData = await response.json();

        dispatch({
            type: CREATE_FILM,
            filmData: {
                id: resData.name,
                categoryIds,
                title,
                duration,
                imdbScore,
                year,
                director,
                stars: ["Great Actor"],
                imageUrl

            }
        })
    }
}

export const updateFilm = (id, title, duration, imdbScore, year, director, imageUrl, categoryIds) => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;
        
        const response = await fetch(`https://films-a6c4d.firebaseio.com/films/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({
                title,
                duration,
                imdbScore,
                year,
                director,
                imageUrl,
                categoryIds
            })
        })

        dispatch({
            type: UPDATE_FILM,
            pid: id,
            filmData: {
                categoryIds,
                title,
                duration,
                imdbScore,
                year,
                director,
                stars: ["Great Actor"],
                imageUrl
            }
        })
    }
}

export const deleteFilm = filmId => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.token;

        await fetch(`https://films-a6c4d.firebaseio.com/films/${filmId}.json?auth=${token}`, {
            method: 'DELETE'
        })

        dispatch({ type: DELETE_FILM, id: filmId })
    }
}