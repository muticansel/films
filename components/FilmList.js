import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FilmItem from './FilmItem';

const MealList = props => {
    const renderFilmItem = itemData => {
        return (
            <FilmItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectFilm={() => {
                    props.navigation.navigate({
                        routeName: 'FilmDetail',
                        params: {
                            filmId: itemData.item.id
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