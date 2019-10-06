import React, { Component } from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import Fetch from './component/Fetch';
import Buy from './component/Buy';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'

import ApiKeys from './assets/ApiKeys'
import firebase from 'firebase'
import 'firebase/firestore'

const Navigator = createSwitchNavigator(
  {
    Login: Login,
    Home: Home,
    Signup: Signup
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {

  // ToDo not state!!!
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAwxP8u4W9M2CCsXo1BKAXuwfYAn3EUvck",
      authDomain: "handl-394e9.firebaseapp.com",
      databaseURL: "https://handl-394e9.firebaseio.com",
      projectId: "handl-394e9",
      storageBucket: "handl-394e9.appspot.com",
      messagingSenderId: "514348001827",
      appId: "1:514348001827:web:1511fd95cfd776be031f96"
    });
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});