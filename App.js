import React from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

import { StatusBar } from 'expo-status-bar';

init()
  .then(() => {
    console.log('initialized database');
  })
  .catch(err => {
    console.log('initializing db is failed')
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
      <StatusBar style='light' hidden={true} />
    </Provider>
  );
}

