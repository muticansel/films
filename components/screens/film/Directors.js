import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

import DrawerButton from '../../UI/HeaderDrawerButton';

const Directors = props => {
    return (
        <View style={styles.mainContainer}>
            <Text>
                Directors screen
            </Text>
        </View>
    )
}

Directors.navigationOptions = navData => {
    return {
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
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

export default Directors;