import React from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../UI/HeaderButton';
import DefaultText from '../UI/DefaultText';

const FilmDetail = props => {
    const availableFilms = useSelector(state => state.filmReducer.films)
    const filmId = props.navigation.getParam('filmId');
    const selectedFilm = availableFilms.find(film => film.id === filmId);

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
    const filmTitle = navData.navigation.getParam('filmTitle')

    return {
        headerTitle: filmTitle,
        headerRight: () => (
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