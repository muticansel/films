import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/colors';
import Categories from '../components/screens/CategoriesScreen';
import CategoryFilms from '../components/screens/CategoryFilms';

const FilmsNavigator = createStackNavigator({
    Categories: Categories,
    CategoryFilms: CategoryFilms
}, {
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'andorid' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'andorid' ? "white" : Colors.primary
    }
})

export default createAppContainer(FilmsNavigator);