import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Platform } from 'react-native';

import { CATEGORIES } from '../../constants/categories';
import Colors from '../../constants/colors';


const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return (
            <TouchableOpacity style={styles.gridContainer}
                onPress={() => {
                    props.navigation.navigate('CategoryFilms', {
                        categoryId: itemData.item.id 
                    })
                }}>
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem} />
    )
}

CategoriesScreen.navigationOptions = {
    headerTitle: 'Film Categories',
    headerStyle: {
        backgroundColor: Platform.OS === 'andorid' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'andorid' ? "white" : Colors.primary
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        margin: 15,
        height: 150
    }
})

export default CategoriesScreen;