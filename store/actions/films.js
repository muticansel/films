export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const CREATE_FILM = 'CREATE_FILM';

export const toggleFav = (id) => {
    return { type: TOGGLE_FAVORITE, filmId: id }
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

        const resData = await response.json();

        dispatch({
            type: CREATE_FILM,
            filmData: {
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