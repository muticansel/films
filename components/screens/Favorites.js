import React from 'react';
import { StyleSheet } from 'react-native';
import FilmList from '../FilmList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../UI/HeaderButton';

const Favorites = props => {
    return (
        <FilmList listData={[]} navigation={props.navigation} />
    )
}

Favorites.navigationOptions = navData => {
    return {
        headerTitle: 'Favorites',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => { 
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
}

export default Favorites;