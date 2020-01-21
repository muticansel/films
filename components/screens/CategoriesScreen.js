import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Platform } from 'react-native';

import { CATEGORIES } from '../../constants/categories';
import CategoryGrid from '../CategoryGrid';
import Colors from '../../constants/colors';



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

CategoriesScreen.navigationOptions = {
    headerTitle: 'Film Categories'
}

const styles = StyleSheet.create({
})

export default CategoriesScreen;