import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Categories from '../components/screens/film/CategoriesScreen';
import CategoryFilms from '../components/screens/film/CategoryFilms';
import FilmDetail from '../components/screens/film/FilmDetail';
import Favorites from '../components/screens/film/Favorites';
import UserFilms from '../components/screens/user/UserFilms';
import EditFilm from '../components/screens/user/EditFilm';
import AuthScreen from '../components/screens/user/AuthScreen';
import Colors from '../constants/colors'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? "white" : Colors.primary
}

export const FilmsStackNavigator = createStackNavigator({
    Categories: Categories,
    CategoryFilms: CategoryFilms,
    FilmDetail: FilmDetail
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

export const FavStackNavigator = createStackNavigator({
    Favorites: Favorites,
    FilmDetail: FilmDetail
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

export const AdminStackNavigator = createStackNavigator(
    {
        UserFilms: UserFilms,
        EditFilm: EditFilm
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultStackNavOptions
    }
);

export const AuthStackNavigator = createStackNavigator({
    Auth: AuthScreen
})