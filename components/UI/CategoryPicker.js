import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker, Icon } from "native-base";

import Constants from '../../constants/constants'

const CategoryPicker = props => {

    const catSelect = (val) => {
        props.onSelectPicker(val)
    }

    return (
        <Picker note
            mode="dropdown"
            style={styles.input}
            selectedValue={props.cat}
            iosHeader="Category"
            iosIcon={<Icon name="arrow-down" />}
            onValueChange={(cat) => { catSelect(cat) }}>
            {Constants.categories.map(cat => {
                return (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                )
            })}
        </Picker>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default CategoryPicker;