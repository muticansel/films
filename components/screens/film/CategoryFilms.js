import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { CATEGORIES } from '../../../constants/categories';
import FilmList from './FilmList';
import * as filmActions from '../../../store/actions/films';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');
    const availableFilms = useSelector(state => state.filmReducer.films);
    const displayedFilms = availableFilms.filter(film => film.categoryIds.indexOf(catId) >= 0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filmActions.fetchFilms())
    }, [dispatch])

    return (
        <FilmList listData={displayedFilms} navigation={props.navigation} />
    )
}

CategoryFilms.navigationOptions = navData => {
    const catId = navData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    }
}

export default CategoryFilms;