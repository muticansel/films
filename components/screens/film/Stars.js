import React from 'react';
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native';

import DrawerButton from '../../UI/HeaderDrawerButton.js';

const Stars = props => {
    return (
        <View style={styles.mainContainer}>
            <Text>
                Stars screen
            </Text>
        </View>
    )
}

Stars.navigationOptions = navData => {
    return {
        headerLeft: () => <DrawerButton toggleDrawerHandler={() => {
            navData.navigation.toggleDrawer()
        }} />
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Stars;