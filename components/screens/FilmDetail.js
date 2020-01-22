import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { FILMS } from '../../constants/categories';
import CustomHeaderButton from '../UI/HeaderButton';

const FilmDetail = props => {
    const filmId = props.navigation.getParam('filmId');
    console.log(filmId)
    const selectedFilm = FILMS.find(film => film.id === filmId);

    return (
        <View style={styles.mainContainer}>
            <Text>{selectedFilm.title}</Text>
            <Button title="Go to Categories"
                onPress={() => {
                    props.navigation.popToTop();
                }}
            />
        </View>
    )
}

FilmDetail.navigationOptions = navData => {
    const filmId = navData.navigation.getParam('filmId');
    const selectedFilm = FILMS.find(film => film.id === filmId);

    return {
        headerTitle: selectedFilm.title,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Favorite" iconName="ios-star" onPress={() => { }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FilmDetail;