export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFav = (id) => {
    return { type: TOGGLE_FAVORITE, filmId: id }
}