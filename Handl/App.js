import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
// import Fetch from './component/Fetch';
// import Buy from './component/Buy';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './pages/Login'
// import Home from './pages/Home'
import Intro from './component/Intro'
import Signup from './pages/Signup'
// import AppDrawerNavigator from './component/DrawerNavigator'

import ApiKeys from './assets/ApiKeys'
import firebase from 'firebase'
import 'firebase/firestore'

import Setting from './component/Setting'
import QRcodes from './component/CardComponent'
import Profile from './component/profile'
import AddContact from './component/addContact'
import QRScanner from './component/QRScanner'
import { Ionicons } from '@expo/vector-icons'

const HomeBottomTabNavigator = createBottomTabNavigator(
  {
      Profile,
      QRcodes,
      AddContact,
      QRScanner,
  },
  {
      navigationOptions:({navigation})=>{
          const {routeName} = navigation.state.routes[navigation.state.index] 
          if (routeName == 'Profile'){
            return {
                headerTitle: routeName,
                headerRight: <Text style={{marginRight: 20}}>Save</Text>,
                headerLeft: <Ionicons 
                                name="md-menu" 
                                onPress={()=>navigation.openDrawer()}
                                size={20} 
                                style={{marginLeft: 15}}/>
            }
          }
          else{
            return {
              headerTitle: routeName,
              headerLeft: <Ionicons 
                              name="md-menu" 
                              onPress={()=>navigation.openDrawer()}
                              size={20} 
                              style={{marginLeft: 15}}/>
            }
          }
      }
  }
)

const HomeStackNavigator = createStackNavigator(
  {
      HomeBottomTabNavigator: HomeBottomTabNavigator
  }
)

const SettingBottomTabNavigator = createBottomTabNavigator(
  {
      Setting
  },
  {
      navigationOptions:({navigation})=>{
          return {
              headerTitle: 'Setting',
              headerRight: <Text style={{marginRight: 20}}>Save</Text>,
              headerLeft: <Ionicons 
                              name="md-menu" 
                              onPress={()=>navigation.openDrawer()}
                              size={30} 
                              style={{marginLeft: 15}}/>
          }
      }
  }
)

const SettingStackNavigator = createStackNavigator(
  {
      SettingBottomTabNavigator: SettingBottomTabNavigator
  }
)

const AppDrawerNavigator = createDrawerNavigator(
  {
      Home:{
          screen: HomeStackNavigator
      },
      Setting:{
          screen: SettingStackNavigator
      },
  }
  ,
  {
      initialRouteName: 'Home'
  }
)
const Navigator = createSwitchNavigator(
  {
    Login: Login,
    Home: {screen: AppDrawerNavigator},
    Intro: Intro,
    Signup: Signup
  },
  {
    initialRouteName: 'Login'
    //initialRouteName: 'Home'
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
    console.log(ApiKeys)
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
  }
});


// "react-native-svg": "^9.11.1",
// "react-native-qrcode": "^0.2.7",
// "react-native-qrcode-svg": "^5.2.0",