import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Picker, Form, Content, Button, Text } from 'native-base';

import DrawerButton from '../UI/HeaderDrawerButton';

const FILMS_BASE = 'films';
const MEALS_BASE = 'meals';

const SelectBase = props => {
    const [base, setBase] = useState("films");

    const pickerChanged = (value) => {
        setBase(value);
    }

    const baseSelected = () => {
        switch (base) {
            case FILMS_BASE:
                props.navigation.navigate('Film')
                break;
            case MEALS_BASE:
                props.navigation.navigate('Meal')
                break;
            default:
                props.navigation.navigate('AppBase')
                break;
        }
    }

    return (
        <Container>
            <Content contentContainerStyle={styles.contentStyle}>
                <Form>
                    <Picker note
                        mode="dropdown"
                        style={{ borderWidth: 1 }}
                        selectedValue={base}
                        onValueChange={pickerChanged}>
                        <Picker.Item label="Films" value="films" />
                        <Picker.Item label="Meals" value="meals" />
                    </Picker>
                    <Button success style={{ marginTop: 50 }} onPress={baseSelected}>
                        <Text>Continue</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

SelectBase.navigationOptions = navData => {
    return {
        headerTitle: 'Select the Base',
        headerLeft: () =>
            <DrawerButton toggleDrawerHandler={() => {
                navData.navigation.toggleDrawer()
            }} />
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SelectBase;