import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Platform } from 'react-native';

import { CATEGORIES } from '../../../constants/categories';
import CategoryGrid from '../../CategoryGrid';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../UI/HeaderButton';



const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return (
            <CategoryGrid title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => props.navigation.navigate('CategoryFilms', {
                    categoryId: itemData.item.id
                })} />
        )
    }

    return (
        <FlatList numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem} />
    )
}

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Film Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
})

export default CategoriesScreen;