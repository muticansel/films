import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Categories from '../components/screens/film/CategoriesScreen';
import CategoryFilms from '../components/screens/film/CategoryFilms';
import FilmDetail from '../components/screens/film/FilmDetail';
import Favorites from '../components/screens/film/Favorites';
import MealCategories from '../components/screens/meal/MealCategories';
import UserFilms from '../components/screens/user/UserFilms';
import EditFilm from '../components/screens/user/EditFilm';
import UserMeals from '../components/screens/user/UserMeals';
import EditMeal from '../components/screens/meal/EditMeal';
import AuthScreen from '../components/screens/user/AuthScreen';
import Stars from '../components/screens/film/Stars';
import Directors from '../components/screens/film/Directors';
import SelectBase from '../components/screens/SelectBase';
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

export const BaseStackNavigator = createStackNavigator(
    {
        BaseScreen: SelectBase
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

// export const StasrsStackNavigator = createStackNavigator(
//     {
//         Stars: Stars,
//         Directors: Directors
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <FontAwesome
//                     name={'star'}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />
//             )
//         },
//         defaultNavigationOptions: defaultStackNavOptions
//     }
// );

export const StarsStackNavigator = createStackNavigator(
    {
        Stars: Stars
    },
    {
        mode: 'modal',
        defaultNavigationOptions: defaultStackNavOptions
    }
)

export const DirectorsStackNavigator = createStackNavigator({
    Directors: Directors
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

export const AuthStackNavigator = createStackNavigator({
    Auth: AuthScreen
})

//* BEGIN MEALS */
export const MealsStackNavigator = createStackNavigator({
    MealCategories: MealCategories
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
})

export const UserMealsStackNav = createStackNavigator(
    {
        UserMeals: UserMeals,
        EditMeal: EditMeal
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
)

//* END MEALS */