import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';  //this is for only ios
import { Camera } from 'expo-camera';       // izinlerin yeri degisicek bu guncel sekli

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {                             // this is for only ios
        const result = await Camera.requestCameraPermissionsAsync();   //CAMERA ROLL is for access the galery btw
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to take a picture.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({                     //launchImageLibraryAsync bu galeriyi acmak icin
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.6
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker} >
            <View style={styles.imagePreview}>
                {!pickedImage ? (<Text>No image picked yet.</Text>)
                    : (<Image style={styles.image} source={{ uri: pickedImage }} />)}
            </View>
            <Button
                title="Take Image"
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 14
    },
    imagePreview: {
        width: '100%',
        height: 222,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 2
    },
    image: {
        width: '100%',
        height: '100%'
    }

});

export default ImgPicker;
