import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import FilmItem from './FilmItem';
import * as filmActions from '../store/actions/films';

const MealList = props => {
    const favFilms = useSelector(state => state.filmReducer.favoriteFilms);

    const renderFilmItem = itemData => {
        const isFav = favFilms.some(film => film.id === itemData.item.id);

        return (
            <FilmItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectFilm={() => {
                    props.navigation.navigate({
                        routeName: 'FilmDetail',
                        params: {
                            filmId: itemData.item.id,
                            filmTitle: itemData.item.title,
                            isFav: isFav
                        }
                    })
                }} />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList data={props.listData}
                renderItem={renderFilmItem}
                style={{ width: '100%' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
})

export default MealList;