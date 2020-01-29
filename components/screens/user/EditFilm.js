import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../UI/HeaderButton';
import * as filmActions from '../../../store/actions/films';

const EditFilm = props => {
    const filmId = props.navigation.getParam('filmId');
    const editedFilm = useSelector(state =>
        state.filmReducer.films.find(film => film.id === filmId)
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedFilm ? editedFilm.title : '');
    const [imageUrl, setImageUrl] = useState(
        editedFilm ? editedFilm.imageUrl : ''
    );
    const [duration, setDuration] = useState(editedFilm ? editedFilm.duration : 0);
    const [imdbScore, setImdbScore] = useState(editedFilm ? editedFilm.imdbScore : 0);
    const [director, setDirector] = useState(editedFilm ? editedFilm.director : '')
    const [year, setYear] = useState(
        editedFilm ? editedFilm.year : ''
    );

    const submitHandler = useCallback(() => {
        if (editedFilm) {
            dispatch(
                filmActions.updateFilm(filmId, title, duration, imdbScore, year, director, imageUrl)
            );
        } else {
            dispatch(
                filmActions.createFilm(title, duration, imdbScore, year, director, imageUrl)
            );
        }
        props.navigation.goBack();
    }, [dispatch, filmId, title, duration, year, imdbScore, director, imageUrl]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Director</Text>
                    <TextInput
                        style={styles.input}
                        value={director}
                        onChangeText={text => setDirector(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        value={duration}
                        onChangeText={text => setDuration(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMDB Score</Text>
                    <TextInput
                        style={styles.input}
                        value={imdbScore}
                        onChangeText={text => setImdbScore(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Year</Text>
                    <TextInput
                        style={styles.input}
                        value={year}
                        onChangeText={text => setYear(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditFilm.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('filmId')
            ? 'Edit Film'
            : 'Add Film+',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditFilm;