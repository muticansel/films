import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Colors from '../constants/colors';
import Categories from '../components/screens/CategoriesScreen';
import CategoryFilms from '../components/screens/CategoryFilms';
import FilmDetail from '../components/screens/FilmDetail';
import Favorites from '../components/screens/Favorites';

const FilmsStackNavigator = createStackNavigator({
    Categories: Categories,
    CategoryFilms: CategoryFilms,
    FilmDetail: FilmDetail
}, {
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'andorid' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'andorid' ? "white" : Colors.primary
    }
})

const FilmTabNavigator = createBottomTabNavigator({
    Films: FilmsStackNavigator,
    Favorites: Favorites
})

export default createAppContainer(FilmTabNavigator);