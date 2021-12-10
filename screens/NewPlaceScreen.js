import React, { useState } from "react";
import { ScrollView, View, Button, StyleSheet, Text, TextInput } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //validation da eklenebilir
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage));
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