import React from 'react';
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../../../constants/categories';
import FilmList from '../../FilmList';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');
    const availableFilms = useSelector(state => state.filmReducer.filteredFilms)

    const displayedFilms = availableFilms.filter(film => film.categoryIds.indexOf(catId) >= 0);

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