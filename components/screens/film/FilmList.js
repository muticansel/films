import React from 'react';
import { FlatList, StyleSheet, View, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import FilmItem from './FilmItem';
import Colors from '../../../constants/colors'
import * as filmActions from '../../../store/actions/films';

const FilmList = props => {
    const favFilms = useSelector(state => state.filmReducer.favoriteFilms);

    const dispatch = useDispatch();

    const selectItemHandler = (id, isFav) => {
        props.navigation.navigate('EditFilm', {
            filmId: id,
            isFav: isFav
        })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default'},
            { text: 'Yes', style: 'destructive', onPress:() => {
                dispatch(filmActions.deleteFilm(id))
            }}
        ])
    }

    const renderFilmItem = itemData => {
        const isFav = favFilms.some(film => film.id === itemData.item.id)

        return (
            <FilmItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectFilm={() => {
                    selectItemHandler(itemData.item.id, isFav)
                }}>
                {props.userFilms && (
                    <View style={styles.buttons}>
                        <Button color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                selectItemHandler(itemData.item.id, isFav)
                            }} />
                        <Button color={Colors.primary}
                            title="Delete"
                            onPress={deleteHandler.bind(this, itemData.item.id)} />
                    </View>
                )}
            </FilmItem>
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
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default FilmList;