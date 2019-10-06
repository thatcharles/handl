import React, { Component } from 'react'
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

import ApiKeys from '../assets/ApiKeys'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Buy extends Component {
    constructor(props) {
        super()
        this.state = {
            isLoadingComplete: false,
            customerEmail: '',
            paymentCardNumber: '',
            paymentType: '',
            transactionAmount: '',
            transactionDate: '',
            transactionType: ''
        }

        // init Firebase
        firebase.initializeApp(ApiKeys.firebaseConfig);
    }

    submitForm = () => {
        alert(this.state.paymentType + '\n' + this.state.transactionAmount)

        firebase.firestore().collection('transactions').add({
            customerEmail: 'absabs@goodmail.com',
            paymentCardNumber: '12312312345',
            paymentType: this.state.paymentType,
            transactionAmount: this.state.transactionAmount,
            transactionDate: '2019/8/31 10:58:00 PM',
            transactionType: 'purchase'
          }).then(ref => {
            console.log('Added document with ID: ', ref.id);
          });
    }

    handleChange = key => val => {
        this.setState({
            [key]: val
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="paymentType" value={this.state.paymentType} style={styles.input} onChangeText={this.handleChange('paymentType')}/>
                <TextInput placeholder="transactionAmount" value={this.state.transactionAmount} style={styles.input} onChangeText={this.handleChange('transactionAmount')}/>
                < TouchableOpacity >
                    <Button title="Enter" onPress={this.submitForm}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        marginBottom: 1,
        borderRadius: 5
    }
});

AppRegistry.registerComponent('Buy', () => Buy);
