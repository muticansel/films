import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Colors from '../constants/colors'
import { FilmsStackNavigator, FavStackNavigator } from './StackNavigators'

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
        screen: FavStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-star"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    }
}

export const FilmTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primary
        }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    })