import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../components/UI/HeaderButton';
import DrawerButton from '../../UI/HeaderDrawerButton';
import MealList from '../meal/MealList';

const UserMeals = props => {
    const userMeals = useSelector(state => state.mealReducer.userMeals);

    return (
        <MealList listData={userMeals}
            navigation={props.navigation} userMeals />
    )
}

UserMeals.navigationOptions = navData => {
    return {
        headerTitle: 'Your Meals',
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
                navData.navigation.toggleDrawer()
            }} />,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditMeal');
                    }}
                />
            </HeaderButtons>
        )
    };
};


export default UserMeals;