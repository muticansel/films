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
        props.navigation.navigate('FilmDetail', {
            filmId: id,
            isFav: isFav
        })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(filmActions.deleteFilm(id))
                }
            }
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
                        <View style={styles.button}>
                            <Button color={Colors.accentColor}
                                title="Edit"
                                onPress={() => {
                                    selectItemHandler(itemData.item.id, isFav)
                                }} />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button} color={Colors.accentColor}
                                title="Delete"
                                onPress={deleteHandler.bind(this, itemData.item.id)} />
                        </View>
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
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden'

    }
})

export default FilmList;