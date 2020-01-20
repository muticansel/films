import React from 'react';
import { } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Categories from '../components/screens/CategoriesScreen';
import CategoryFilms from '../components/screens/CategoryFilms';

const FilmsNavigator = createStackNavigator({
    Categories: Categories,
    CategoryFilms: CategoryFilms
})

export default createAppContainer(FilmsNavigator);