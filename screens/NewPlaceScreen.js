import React, { useState, useCallback } from "react";
import { ScrollView, View, Button, StyleSheet, Text, TextInput } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //validation da eklenebilir
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
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
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                />
                <View style={styles.button}>
                    <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
                </View>
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add New Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 29
    },
    label: {
        fontSize: 19,
        marginBottom: 1
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 4,
        marginBottom: 14,
        paddingVertical: 2,
        paddingHorizontal: 2
    },
    button: {
        marginTop:5
    }
});

export default NewPlaceScreen;