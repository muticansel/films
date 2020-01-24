import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Colors from '../constants/colors';
import Categories from '../components/screens/CategoriesScreen';
import CategoryFilms from '../components/screens/CategoryFilms';
import FilmDetail from '../components/screens/FilmDetail';
import Favorites from '../components/screens/Favorites';
//import Filters from '../components/screens/Filters';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? "white" : Colors.primary
}

const FilmsStackNavigator = createStackNavigator({
    Categories: Categories,
    CategoryFilms: CategoryFilms,
    FilmDetail: FilmDetail
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

const FavNavigator = createStackNavigator({
    Favorites: Favorites,
    FilmDetail: FilmDetail
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
    Films: {
        screen: FilmsStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <FontAwesome name="film"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-star"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const FilmTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator({
        tabScreenConfig
    }, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    })

// const FilterStackNavigator = createStackNavigator({
//     Filters: Filters
// })

const MainNavigator = createDrawerNavigator({
    FilmsFav: {
        screen: FilmTabNavigator,
        navigationOptions: {
            drawerLabel: "Films"
        }
    },
    Filters: FilmTabNavigator // FilterStack
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: "open-sans-bold"
        }
    }
})

export default createAppContainer(MainNavigator);