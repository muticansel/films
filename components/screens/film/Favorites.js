import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import FilmList from './FilmList';
import DrawerButton from '../../UI/HeaderDrawerButton';
import DefaultText from '../../UI/DefaultText';

const Favorites = props => {
    const favFilms = useSelector(state => state.filmReducer.favoriteFilms);

    if(favFilms.length === 0) {
        return (
            <View style={styles.noFilm}>
                <DefaultText>No Favorite Films found. Start adding one</DefaultText>
            </View>
        )
    }

    return (
        <FilmList listData={favFilms} navigation={props.navigation} />
    )
}

Favorites.navigationOptions = navData => {
    return {
        headerTitle: 'Favorites',
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
                navData.navigation.toggleDrawer()
            }} />
    }
}

const styles = StyleSheet.create({
    noFilm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Favorites;