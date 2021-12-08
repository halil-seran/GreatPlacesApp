import React from "react";
import { View, StyleSheet, Text } from "react-native";

const NewPlaceScreen = props => {
    return (
        <View>
            <Text>NewPlaceScreen</Text>
        </View>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({

});

export default NewPlaceScreen;