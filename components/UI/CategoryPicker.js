import React, { useState } from 'react';
import { Picker } from 'react-native';

import Constants from '../../constants/constants'

const CategoryPicker = props => {

    const catSelect = (val) => {
        props.onSelectPicker(val)
    }

    return (
        <Picker
            selectedValue={props.cat}
            style={props.style}
            onValueChange={(itemValue, itemIndex) =>
                catSelect(itemValue)
            }>
            {
                Constants.categories.map(cat => {
                    return (
                        <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                    )
                })
            }
        </Picker>
    )
}

export default CategoryPicker;