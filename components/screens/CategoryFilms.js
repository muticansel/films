import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CATEGORIES } from '../../constants/categories';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return (
        <View style={styles.mainContainer}>
            <Text>{selectedCategory.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryFilms;