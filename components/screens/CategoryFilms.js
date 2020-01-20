import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { CATEGORIES } from '../../constants/categories';
import Colors from '../../constants/colors';

const CategoryFilms = props => {
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.mainContainer}>
            <Text>{selectedCategory.title}</Text>
        </View>
    )
}

CategoryFilms.navigationOptions = navData => {
    const catId = navData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryFilms;