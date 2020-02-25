import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import CategoryGrid from '../../UI/CategoryGrid';

import Constants from '../../../constants/constants';
import DrawerButton from '../../UI/HeaderDrawerButton';
import DefaultText from '../../UI/DefaultText';
import * as mealActions from '../../../store/actions/meals'
import Colors from '../../../constants/colors';


const MealCategories = props => {
    const [isLoading, setIsLoading] = useState(false);
    const meals = useSelector(state => state.mealReducer.meals);
    const dispatch = useDispatch()

    const loadMeals = useCallback(async () => {
        setIsLoading(true);
        await dispatch(mealActions.fetchMeals())
        setIsLoading(false);
    }, [dispatch, setIsLoading])

    useEffect(() => {
        loadMeals()
    }, [dispatch, loadMeals])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadMeals);

        return () => {
            willFocusSub.remove()
        }
    }, [loadMeals])

    const renderGridItem = itemData => {
        return (
            <CategoryGrid title={itemData.item.name}
                color={itemData.item.color}
                onSelect={() => props.navigation.navigate('CategoryMeals', {
                    categoryId: itemData.item.id
                })} />
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    // if (!isLoading && meals.length === 0) {
    //     return (
    //         <View style={styles.loading}>
    //             <DefaultText>No meal is found. You can start to add...</DefaultText>
    //         </View>
    //     )
    // }

    return (
        <FlatList numColumns={2}
            data={Constants.meals}
            renderItem={renderGridItem} />
    )
}

MealCategories.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
                navData.navigation.toggleDrawer()
            }} />
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default MealCategories;