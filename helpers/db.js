import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');  //db varsa kullanir yoksa olustutup kullanir

export const init = () => {
    const promise = new Promise((resolve, reject) => {      //cozmek reddetmek
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL );',        //this is sql code and places adinda bir table yoksa olustur // id is primary key and you cant have same id twice //adding an empty value there will not be allowed  //LAT AND LNG IS ENLEM BOYLAM KONUM ICIN
                [],             //buraya dinamik veriler icin argumentleri yaziyoruz
                () => {     //bu ilk sql codu hatasiz calisirsa execute oluyor
                    resolve();
                },
                (_, err) => {     //bu ilk sql codu hatali calisirsa execute oluyor
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,  //we can use ${title}, ${imageUri} like that bu t this is unsecure, sqlinjections
                [title, imageUri, address, lat, lng],  //bu sekilde cok daha guvenli
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places',
                [],  //we dont inject any argument here because of this this is empty 
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};



// firstly we creating a table 