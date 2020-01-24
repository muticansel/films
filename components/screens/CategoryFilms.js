import React from 'react';

import { CATEGORIES, FILMS } from '../../constants/categories';
import FilmList from '../FilmList';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');

    const displayedFilms = FILMS.filter(film => film.categoryIds.indexOf(catId) >= 0);

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