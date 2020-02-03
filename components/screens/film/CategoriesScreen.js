import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import Constants from '../../../constants/constants';
import CategoryGrid from '../../UI/CategoryGrid';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/HeaderButton';
import DefaultText from '../../UI/DefaultText';
import * as filmActions from '../../../store/actions/films'
import Colors from '../../../constants/colors';


const CategoriesScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const films = useSelector(state => state.filmReducer.films);
    const dispatch = useDispatch()

    const loadFilms = useCallback(async () => {
        setIsLoading(true);
        await dispatch(filmActions.fetchFilms())
        setIsLoading(false);
    }, [dispatch, setIsLoading])

    useEffect(() => {
        loadFilms()
    }, [dispatch, loadFilms])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadFilms);

        return () => {
            willFocusSub.remove()
        }
    }, [loadFilms])

    const renderGridItem = itemData => {
        return (
            <CategoryGrid title={itemData.item.name}
                color={itemData.item.color}
                onSelect={() => props.navigation.navigate('CategoryFilms', {
                    categoryId: itemData.item.id
                })} />
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (!isLoading && films.length === 0) {
        return (
            <View style={styles.loading}>
                <DefaultText>No film is found. You can start to add...</DefaultText>
            </View>
        )
    }

    return (
        <FlatList numColumns={2}
            data={Constants.categories}
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default CategoriesScreen;