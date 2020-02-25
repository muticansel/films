import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Colors from '../constants/colors'
import { FilmsStackNavigator, FavStackNavigator, StarsStackNavigator, DirectorsStackNavigator, MealsStackNavigator } from './StackNavigators';

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

const mealsTabScreenConfig = {
    Meals: {
        screen: MealsStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <MaterialCommunityIcons name="food"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    }
}

const starsTabScreenConfig = {
    Stars: {
        screen: StarsStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <FontAwesome name="star"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    },
    Directors: {
        screen: DirectorsStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <FontAwesome name="video-camera"
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

export const MealTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(mealsTabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primary
        }
    })
    : createBottomTabNavigator(mealsTabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    })

export const StarsTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(starsTabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primary
        }
    })
    : createBottomTabNavigator(starsTabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    })