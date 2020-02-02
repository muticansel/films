import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/colors';
import Categories from '../components/screens/film/CategoriesScreen';
import CategoryFilms from '../components/screens/film/CategoryFilms';
import FilmDetail from '../components/screens/film/FilmDetail';
import AuthScreen from '../components/screens/user/AuthScreen';
import Favorites from '../components/screens/film/Favorites';
import StartupScreen from '../components/screens/StartupScreen';
import UserFilms from '../components/screens/user/UserFilms';
import EditFilm from '../components/screens/user/EditFilm';
import * as authActions from '../store/actions/auth';
//import Filters from '../components/screens/Filters';

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

const AdminNavigator = createStackNavigator(
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
            tabBarColor: Colors.primary
        }
    }
}

const FilmTabNavigator = Platform.OS === 'android'
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

// const FilterStackNavigator = createStackNavigator({
//     Filters: Filters
// })

const FilmMainNavigator = createDrawerNavigator({
    FilmsFav: {
        screen: FilmTabNavigator,
        navigationOptions: {
            drawerLabel: "Films"
        }
    },
    Filters: FilmTabNavigator, // FilterStack
    UserFilms: {
        screen: AdminNavigator,
        navigationOptions: {
            drawerLabel: "User Films"
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: "open-sans-bold"
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    <Button title="Logout" color={Colors.primary} onPress={() => {
                        dispatch(authActions.logOut())
                        props.navigation.navigate('Auth')
                    }} />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
})

const SwitchNavigator = createSwitchNavigator({
    StartupScreen: StartupScreen,
    Auth: AuthNavigator,
    Film: FilmMainNavigator
})

export default createAppContainer(SwitchNavigator);