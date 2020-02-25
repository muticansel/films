import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';

import Colors from '../constants/colors';
import * as authActions from '../store/actions/auth';
import { FilmTabNavigator, StarsTabNavigator, MealTabNavigator } from './TabNavigators';
import { AdminStackNavigator, BaseStackNavigator } from './StackNavigators';

const drawerOption = {
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
}

export const FilmDrawerNavigator = createDrawerNavigator({
    FilmsFav: {
        screen: FilmTabNavigator,
        navigationOptions: {
            drawerLabel: "Films"
        }
    },
    Filters: FilmTabNavigator, // FilterStack
    UserFilms: {
        screen: AdminStackNavigator,
        navigationOptions: {
            drawerLabel: "User Films"
        }
    },
    Stars: {
        screen: StarsTabNavigator,
        navigationOptions: {
            drawerLabel: "Stars / Directors"
        }
    }
}, drawerOption)

export const MealDrawerNavigator = createDrawerNavigator({
    Meals: {
        screen: MealTabNavigator,
        navigationOptions: {
            drawerLabel: "Meals"
        }
    }
}, drawerOption)

export const AppBaseDrawerNav = createDrawerNavigator({
    SelectBase: {
        screen: BaseStackNavigator,
        navigationOptions: {
            drawerLabel: "Change the Base"
        }
    }
}, drawerOption)