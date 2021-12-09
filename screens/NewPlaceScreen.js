import React, { useState } from "react";
import { ScrollView, View, Button, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch } from "react-redux";
import * as placesActions from '../store/places-actions';

const NewPlaceScreen = props => {

    const { titleValue, setTitleValue } = useState('');

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //validation da eklenebilir
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue));
        props.navigation.goBack();
    };


    return (
        <ScrollView>
            <View style={styles.form} >
                <Text style={styles.label} >Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 29
    },
    label: {
        fontSize: 19,
        marginBottom: 14
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 4,
        marginBottom: 16,
        paddingVertical: 1,
        paddingHorizontal: 3
    }
});

export default NewPlaceScreen;