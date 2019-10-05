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
      apiKey: "AIzaSyBikWLz9q1sHxN5xpUT0unYCnQMOtvg_yo",
      authDomain: "mas-store-application.firebaseapp.com",
      databaseURL: "https://mas-store-application.firebaseio.com",
      projectId: "mas-store-application",
      storageBucket: "mas-store-application.appspot.com",
      messagingSenderId: "621067955556",
      appId: "1:621067955556:web:9cc8f772223e350c"
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