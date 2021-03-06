import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../components/UI/HeaderButton';
import DrawerButton from '../../UI/HeaderDrawerButton';
import FilmList from '../film/FilmList';

const UserFilms = props => {
    const userFilms = useSelector(state => state.filmReducer.userFilms);

    const selectItemHandler = (id, isFav) => {
        props.navigation.navigate('FilmDetail', {
            filmId: id,
            isFav: isFav
        })
    }

    return (
        <FilmList listData={userFilms}
            navigation={props.navigation} userFilms />
    )
}

UserFilms.navigationOptions = navData => {
    return {
        headerTitle: 'Your Films',
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
                navData.navigation.toggleDrawer()
            }} />,
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