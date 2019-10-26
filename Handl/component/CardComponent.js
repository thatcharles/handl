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
                    }else if(card.name == 'facebook'){
                        textDisplay = 'My Facebook Profile Page';
                        qrData = card.data;
                    }else if(card.name == 'linkedin'){
                        textDisplay = 'My LinkedIn Profile Page';
                        qrData = card.data;
                    }
                    qrCards.push(
                        <View key = {i} style={styles.slide}>
                            <View style={styles.scrollview}>
                            <QRCode
                                value={qrData}
                                size = {300}
                            />
                            </View>
                            <Text style={{color: 'blue', fontSize: 18, marginTop: 15}}
                                onPress={() => Linking.openURL(qrData)}>
                                {textDisplay}
                            </Text>
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
                    let logData = `Scroll to x = ${event.nativeEvent.contentOffset.x}`
                    //console.log(logData)
                }}
                // update every 10ms
                scrollEventThrottle={10}
                >
                    {qrCards}
    
                    {/*
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
                    </View>*/}
    
                </ScrollView>
            );
        }else{
            return null;
        }
        

        
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