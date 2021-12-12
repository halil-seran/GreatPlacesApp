import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MapScreen = props => {

    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.7647,
        longitude: 30.5567,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("NO PLACE SELECTED", "Please pick a location",
                [{ text: "Okay" }]
            );
            return;
        }
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler })
    }, [savePickedLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates} ></Marker>}
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {

    const saveFn = navData.navigation.getParam('saveLocation');

    return {
        headerRight: () =>
            <TouchableOpacity style={styles.headerButton} onPress={saveFn} >
                <Text style={styles.headerButtonText} >Save</Text>
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 21
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;