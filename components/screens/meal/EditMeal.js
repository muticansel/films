import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardItem, Button, Text } from 'native-base'

import HeaderButton from '../../UI/HeaderButton';
import CategoryPicker from '../../UI/CategoryPicker';
import ListItem from '../../UI/ListItem';
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
    const [newIngr, setNewIngr] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [newStep, setNewStep] = useState("")
    const [steps, setSteps] = useState([])

    const submitHandler = useCallback(() => {
        if (editedMeal) {
            dispatch(
                mealActions.updateMeal(mealId, title, duration, [category], ingredients, steps)
            );
        } else {
            dispatch(
                mealActions.createMeal(title, duration, [category], ingredients, steps, "")
            );
        }
        props.navigation.goBack();
    }, [dispatch, mealId, title, duration, category]);

    const addIngredient = () => {
        setIngredients(currentIngredients => [...currentIngredients, newIngr])
        setNewIngr("");
    }

    const addStep = () => {
        setSteps(currentSteps => [...currentSteps, newStep])
        setNewStep("")
    }

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
                <View style={styles.formControl}>
                    <Text style={styles.label}>Ingredients</Text>
                    <ListItem newItem={newIngr}
                        newItemHandler={setNewIngr}
                        addNewItem={addIngredient}
                        items={ingredients}
                        placeholder="Add Ingredient" />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Steps</Text>
                    <ListItem newItem={newStep}
                        newItemHandler={setNewStep}
                        addNewItem={addStep}
                        items={steps}
                        placeholder="Add Step" />
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
    },
    listItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemTextInput: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    }
});

export default EditMeal;