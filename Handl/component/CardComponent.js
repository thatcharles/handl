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
import { AppRegistry, StyleSheet, TouchableOpacity,ScrollView, Text, View, Dimensions, Image, Animated, FlatList,Platform, Linking } from 'react-native';

import { AsyncStorage } from "react-native"
import QRCode from 'react-native-qrcode-svg';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { cardDataRetrieved: false };
        this.cardData = {};
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(){
        if(!qrCardsUpToDate){
            this.loadData();
        }
    }

    async loadData() {
        if(!qrCardsUpToDate){
            try {
                this.retrieveItem('contactData').then((contactData) => {
                    this.cardData = contactData;
                    console.log('number of cards loaded: ' + this.cardData.cards.length);
                    console.log(this.cardData);
                    qrCardsUpToDate = true;
                    this.setState({cardDataRetrieved: true});
                });
            }catch(error){
                console.log("error retrieving contactData from AsyncStorage");
            }
        }
      }

    async retrieveItem(key) {
        try {
          const retrievedItem =  await AsyncStorage.getItem(key);
          const item = JSON.parse(retrievedItem);
          return item;
        } catch (error) {
          console.log(error.message);
        }
        return;
      }

    render() {
        let qrCards = [];
        if(this.state.cardDataRetrieved){
            let cardNum = this.cardData.cards.length;
            for(let i = 0; i < cardNum; i++){
                const card = this.cardData.cards[i];
                if(card.display){
                    let textDisplay = '';
                    let qrData = '';

                    if(card.name == 'phone'){
                        qrData += 'BEGIN:VCARD\nVERSION:3.0\n';
                        qrData += 'N:' + card.data.lastName + ';' + card.data.firstName + '\n';
                        qrData += 'FN:' + card.data.firstName + ' ' + card.data.lastName + '\n';
                        qrData += 'TEL;CELL:' + card.data.phoneNumber + '\n';
                        qrData += 'EMAIL;WORK;INTERNET:' + card.data.emailAddress + '\n';
                        qrData += 'END:VCARD';
                        
                        textDisplay = 'My Phone Number';
                        qrIcon = require('../assets/QRicons/phone.png');
                    }else if(card.name == 'facebook'){
                        textDisplay = 'My Facebook';
                        qrData = card.data;
                        qrIcon = require('../assets/QRicons/facebook.png');
                    }else if(card.name == 'instagram'){
                        textDisplay = 'My Instagram';
                        qrData = card.data;
                        qrIcon = require('../assets/QRicons/instagram.png');
                    }else if(card.name == 'linkedin'){
                        textDisplay = 'My LinkedIn';
                        qrData = card.data;
                        qrIcon = require('../assets/QRicons/linkedin.png');
                    }
                    qrCards.push(
                        <View key = {i} style={styles.slide}>
                            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold', marginBottom: 15}}>
                                {textDisplay}
                            </Text>
                            <View style={styles.scrollview}>
                                <QRCode
                                    value={qrData}
                                    size = {SCREEN_WIDTH*0.7}
                                />
                            </View>
                            <TouchableOpacity   style={{width: SCREEN_WIDTH*0.2, height: SCREEN_WIDTH*0.2, marginTop: -SCREEN_WIDTH*0.08, zIndex: 2}}
                                                onPress={() => {if(card.name != 'phone') Linking.openURL(qrData);}}>
                                <Image  source={qrIcon} 
                                        style={{width: '100%', height: '100%', zIndex: 2}}
                                />
                            </TouchableOpacity>
                        </View>
                    );    
                }
                
            }
            console.log('cards generated');
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
                    //let logData = `Scroll to x = ${event.nativeEvent.contentOffset.x}`
                    //console.log(logData)
                }}
                // update every 10ms
                scrollEventThrottle={10}
                >
                    {qrCards}
    
                </ScrollView>
            );
        }else{
            return null;
        }
        

        
    }
}

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: '#ffffff',
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.05,
        shadowOpacity: 0.5,
        shadowRadius: 10
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