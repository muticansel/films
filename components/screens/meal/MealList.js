import React from 'react';
import { FlatList, StyleSheet, View, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MealItem from './MealItem';
import Colors from '../../../constants/colors'
import * as mealActions from '../../../store/actions/meals';

const MealList = props => {
    const favMeals = useSelector(state => state.mealReducer.favoriteMeals);

    const dispatch = useDispatch();

    const selectItemHandler = (id, isFav) => {
        props.navigation.navigate('MealDetail', {
            mealId: id,
            isFav: isFav
        })
    }

    const editMealHandler = (id, isFav) => {
        props.navigation.navigate('EditMeal', {
            mealId: id,
            isFav: isFav
        })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(mealActions.deleteFilm(id))
                }
            }
        ])
    }

    const renderMealItem = itemData => {
        const isFav = favMeals.some(meal => meal.id === itemData.item.id)

        return (
            <MealItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    selectItemHandler(itemData.item.id, isFav)
                }}>
                {props.userMeals && (
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button color={Colors.accentColor}
                                title="Edit"
                                onPress={() => {
                                    editMealHandler(itemData.item.id, isFav)
                                }} />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button} color={Colors.accentColor}
                                title="Delete"
                                onPress={deleteHandler.bind(this, itemData.item.id)} />
                        </View>
                    </View>
                )}
            </MealItem>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList data={props.listData}
                renderItem={renderMealItem}
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

export default MealList;