import React from 'react';
import { } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from './HeaderButton';

const HeaderDrawer = props => {
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                props.toggleDrawerHandler()
            }} />
        </HeaderButtons>
    )
}

export default HeaderDrawer;