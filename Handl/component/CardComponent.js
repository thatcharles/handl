import React, { Component } from 'react'
/*
import {AppRegistry, 
        Activityindicator, 
        Text, 
        View, 
        FlatList , 
        StyleSheet, 
        TouchableHighlight, 
        TouchableOpacity,
        TextInput, 
        Button}
        from 'react-native';
*/
import ApiKeys from '../assets/ApiKeys'
import firebase from 'firebase'
import 'firebase/firestore'
import { AppRegistry, StyleSheet, TouchableOpacity,ScrollView, Text, View, Dimensions, Image, Animated, FlatList,Platform } from 'react-native';

import QRComponent from './QRComponent'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const card = [
    { id: "1", uri: require('../assets/QRcode/1.png') },
    { id: "2", uri: require('../assets/QRcode/2.png') },
    { id: "3", uri: require('../assets/QRcode/3.png') },
    { id: "4", uri: require('../assets/QRcode/4.png') }
]

export default class CardComponent extends Component {

    render() {
        return (
            <ScrollView
            horizontal = {true}
            pagingEnabled = {true}
            // execute when scroll starts
            onMomentumScrollBegin={() => {

            }}
            // execute when scroll ends
            onMomentumScrollEnd={() => {

            }}
            // execute when scrolling
            onScroll={(event) => {
                let logData = `Scroll to x = ${event.nativeEvent.contentOffset.x}`
                //console.log(logData)
            }}
            // update every 10ms
            scrollEventThrottle={10}
            >
                <View style={styles.slide}>
                    <View style={styles.scrollview}>
                        <QRComponent/>
                    </View>
                    <Text>
                        LinkedIn
                    </Text>
                </View>

                <View style={styles.slide}>
                    <View style={styles.scroll2}>
                        <Image source={require('../assets/QRcode/2.png')} style={{width: 300, height: 300}}/>
                    </View>
                    <Text>
                        Facebook
                    </Text>
                </View>

                <View style={styles.slide}>
                    <View style={styles.scroll3}>
                        <Image source={require('../assets/QRcode/3.png')} style={{width: 300, height: 300}}/>
                    </View>
                    <Text>
                        Instagram
                    </Text>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: '#5f9ea0',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll2:{
        backgroundColor: '#5f9299',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll3:{
        backgroundColor: '#000000',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        marginBottom: 1,
        borderRadius: 5
    },
    text: {
        fontSize:20,
        color: 'black'
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})

//AppRegistry.registerComponent('CardComponent', () => CardComponent);


/*
<ScrollView
horizontal = {true}
pagingEnabled = {true}
// execute when scroll starts
onMomentumScrollBegin={() => {

}}
// execute when scroll ends
onMomentumScrollEnd={() => {

}}
// execute when scrolling
onScroll={(event) => {
    let logData = `Scroll to x = ${event.nativeEvent.contentOffset.x}`
    //console.log(logData)
}}
// update every 10ms
scrollEventThrottle={10}
>
<View style={styles.scrollview}>
    <Text style={styles.text}>
        Screen 1
    </Text>
</View>
<View style={styles.scroll2}>
    <Text style={styles.text}>
        Screen 2
    </Text>
</View>
<View style={styles.scroll3}>
    <Text style={styles.text} background='#5f9382'>
        Screen 3
    </Text>
</View>

</ScrollView>
*/