import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorites = props => {
    return (
        <View style={styles.mainContainer}>
            <Text>Favorites Screen</Text>
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

export default Favorites;