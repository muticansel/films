import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../UI/HeaderButton';
import DefaultText from '../UI/DefaultText';
import { toggleFav } from '../../store/actions/films';

const FilmDetail = props => {
    const availableFilms = useSelector(state => state.filmReducer.films);
    const filmId = props.navigation.getParam('filmId');
    const currentFilmIsFav = useSelector(state =>
        state.filmReducer.favoriteFilms.some(film => film.id === filmId)
    )
    const selectedFilm = availableFilms.find(film => film.id === filmId);

    const dispatch = useDispatch();

    const toggleFavHandler = useCallback(() => {
        dispatch(toggleFav(filmId))
    }, [dispatch, filmId])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavHandler })
    }, [toggleFavHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: currentFilmIsFav })
    }, [currentFilmIsFav])

    return (
        <ScrollView>
            <View style={styles.image}>
                <Image source={{ uri: selectedFilm.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
                <DefaultText>{props.duration} min.</DefaultText>
            </View>
            <View style={styles.mainContainer}>
                <Text>{selectedFilm.title}</Text>
                <Button title="Go to Categories"
                    onPress={() => {
                        props.navigation.popToTop();
                    }}
                />
            </View>
        </ScrollView>
    )
}

FilmDetail.navigationOptions = navData => {
    const filmTitle = navData.navigation.getParam('filmTitle');
    const toggleFav = navData.navigation.getParam('toggleFav');
    const isFav = navData.navigation.getParam('isFav');

    return {
        headerTitle: filmTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Favorite"
                    iconName={isFav ? "ios-star" : "ios-star-outline"}
                    onPress={toggleFav} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: 200,
        padding: 5,
        borderRadius: 15
    }
})

export default FilmDetail;