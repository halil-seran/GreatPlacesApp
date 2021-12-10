import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();  //someFolder/myimage.jpg => ['someFolder', 'myimage.jpg' => myimage.jpg]
        const newPath = FileSystem.documentDirectory + fileName;   //en saglam dosya saklama yeri

        try {
            await FileSystem.moveAsync({              //moves a file a to b
                from: image,
                to: newPath
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
        

        dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath  } });
    };
};