export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const CREATE_FILM = 'CREATE_FILM';
export const SET_FILMS = 'SET_FILMS';

import Film from '../../models/film';

export const toggleFav = (id) => {
    return { type: TOGGLE_FAVORITE, filmId: id }
}

export const fetchFilms = () => {
    return async dispatch => {
        const response = await fetch(
            'https://films-a6c4d.firebaseio.com/films.json'
        );

        const resData = await response.json();
        const loadedFilms = [];

        for (const key in resData) {
            loadedFilms.push(new Film(
                key,
                ["c1"],
                resData[key].title,
                resData[key].duration,
                resData[key].imdbScore,
                resData[key].year,
                resData[key].director,
                ["Great Actor"],
                resData[key].imageUrl
            ))
        }
        
        dispatch({ type: SET_FILMS, films: loadedFilms })

    }
}

export const createFilm = (title, duration, imdbScore, year, director, imageUrl) => {
    return async dispatch => {
        const response = await fetch('https://films-a6c4d.firebaseio.com/films.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({
                categoryIds: ["c1"],
                title,
                duration,
                imdbScore,
                year,
                director,
                stars: ["Great Actor"],
                imageUrl
            })
        })

        const resData = await response.json();

        dispatch({
            type: CREATE_FILM,
            filmData: {
                id: resData.name,
                categoryIds: ["c1"],
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