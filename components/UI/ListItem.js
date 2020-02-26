import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, CardItem, Text, Button } from 'native-base';

const ListItem = props => {
    return (
        <View>
            <Card>
                <CardItem>
                    <View style={styles.listItem}>
                        <TextInput placeholder={props.placeholder}
                            style={styles.listItemTextInput}
                            onChangeText={props.newItemHandler}
                            value={props.newItem} />
                        <Button success onPress={props.addNewItem}><Text>Add</Text></Button>
                    </View>
                </CardItem>
                {props.items.map(item => {
                    return (
                        <CardItem key={item} bordered style={{ width: '90%', marginLeft: '5%' }}>
                            <Text>{item}</Text>
                        </CardItem>
                    )
                })}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemTextInput: {
        width: '77%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginRight: 5
    }
})

export default ListItem;