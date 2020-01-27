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
                resData[key].stars,
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
                title,
                duration,
                imdbScore,
                year,
                director,
                imageUrl
            })
        })

        console.log(response)

        const resData = await response.json();

        console.log(resData)

        dispatch({
            type: CREATE_FILM,
            filmData: {
                id: resData.name,
                title,
                duration,
                imdbScore,
                year,
                director,
                imageUrl

            }
        })
    }
}