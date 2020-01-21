import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';

import { CATEGORIES, FILMS } from '../../constants/categories';
import Colors from '../../constants/colors';
import FilmItem from '../FilmItem';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    const displayedFilms = FILMS.filter(film => film.categoryIds.indexOf(catId) >= 0);

    const renderFilmItem = itemData => {
        return (
            <FilmItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelecFilm={() => {

                }} />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList data={displayedFilms}
                renderItem={renderFilmItem}
                style={{ width: '100%' }} />
        </View>
    )
}

CategoryFilms.navigationOptions = navData => {
    const catId = navData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
})

export default CategoryFilms;