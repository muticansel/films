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
            {props.items.map(item => {
                return (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
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