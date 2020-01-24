import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import DefaultText from './UI/DefaultText';

const FilmItem = props => {
    return (
        <View style={styles.filmItem}>
            <TouchableOpacity onPress={props.onSelectFilm}>
                <View>
                    <View style={{ ...styles.filmRow, ...styles.filmHeader }}>
                        <ImageBackground source={{ uri: props.image }} style={styles.img}>
                            <Text style={styles.title}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.filmRow, ...styles.filmDetail }}>
                        <DefaultText>{props.duration} min.</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    filmItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10
    },
    img: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    filmHeader: {
        height: '85%'
    },
    filmRow: {
        flexDirection: 'row'
    },
    filmDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    }
})

export default FilmItem;