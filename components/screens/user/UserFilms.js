import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../components/UI/HeaderButton';

import FilmList from '../film/FilmList';

const UserFilms = props => {
    const userFilms = useSelector(state => state.filmReducer.films);
    const dispatch = useDispatch();

    return (
        <FilmList listData={userFilms}
            navigation={props.navigation} />
    )
}

UserFilms.navigationOptions = navData => {
    return {
        headerTitle: 'Your Films',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditFilm');
                    }}
                />
            </HeaderButtons>
        )
    };
};


export default UserFilms;