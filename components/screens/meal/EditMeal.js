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
import CategoryPicker from '../../UI/CategoryPicker';
import * as mealActions from '../../../store/actions/meals';
import Constants from '../../../constants/constants';

const EditMeal = props => {
    const mealId = props.navigation.getParam('mealId');
    const editedMeal = useSelector(state =>
        state.mealReducer.meals.find(meal => meal.id === mealId)
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedMeal ? editedMeal.title : '');
    const [duration, setDuration] = useState(editedMeal ? editedMeal.duration : '');
    const [category, setCategory] = useState(editedMeal ? editedMeal.categoryIds[0] : '')

    const submitHandler = useCallback(() => {
        if (editedMeal) {
            dispatch(
                mealActions.updateFilm(mealId, title, duration, [category])
            );
        } else {
            dispatch(
                mealActions.createFilm(title, duration, [category])
            );
        }
        props.navigation.goBack();
    }, [dispatch, mealId, title, duration, category]);

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
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        value={duration}
                        onChangeText={text => setDuration(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Category</Text>
                    <CategoryPicker style={styles.input}
                        items={Constants.meals}
                        cat={category}
                        onSelectPicker={(val) => {
                            setCategory(val)
                        }} />
                </View>
            </View>
        </ScrollView>
    );
};

EditMeal.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('mealId')
            ? 'Edit Film'
            : 'Add Film',
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

export default EditMeal;