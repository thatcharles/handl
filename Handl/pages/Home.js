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
        Button,
        Picker
        }from 'react-native';


import firebase from 'firebase'
import 'firebase/firestore'
import QRComponent from '../component/QRComponent'
import CardComponent from '../component/CardComponent'
import Profile from '../component/profile'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

export default class Home extends Component {
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
    }


    submitForm = () => {

        alert(this.state.paymentType + '\n' + this.state.transactionAmount)

        let paymentCardNumber = ''
        if (this.state.paymentType == 'card') {
            paymentCardNumber = this.state.paymentCardNumber
        }
        firebase.firestore().collection('transactions').add({
            customerEmail: firebase.auth().currentUser.email,
            paymentCardNumber: paymentCardNumber,
            paymentType: this.state.paymentType,
            transactionAmount: this.state.transactionAmount,
            transactionDate: new Date().toISOString(),
            transactionType: this.state.transactionType
          }).then(ref => {
            console.log('Added document with ID: ', ref.id);
          });
    }

    componentDidMount(){
        this.setState({
            paymentType: 'card',
            transactionType: 'purchase'
        })
    }

    handleChange = key => val => {
        this.setState({
            [key]: val
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <CardComponent/>
                <Profile/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
});

AppRegistry.registerComponent('Home', () => Home);
// <QRComponent/>
/*

                <Text>Select Payment Type</Text>
                <Picker 
                    selectedValue={this.state.paymentType}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({paymentType: itemValue})
                    }>
                    <Picker.Item label="Card" value="card" />
                    <Picker.Item label="Bitcoin" value="bitcoin" />
                </Picker>
                <TextInput placeholder="paymentCardNumber" value={this.state.paymentCardNumber} style={styles.input} onChangeText={this.handleChange('paymentCardNumber')}/>
                <TextInput placeholder="transactionAmount" value={this.state.transactionAmount} style={styles.input} onChangeText={this.handleChange('transactionAmount')}/>
                <Text>Select Transaction Type</Text>
                <Picker
                    selectedValue={this.state.transactionType}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({transactionType: itemValue})
                    }>
                    <Picker.Item label="Purchase" value="purchase" />
                    <Picker.Item label="PayBack" value="payback" />
                </Picker>
                < TouchableOpacity >
                    <Button title="Enter" onPress={this.submitForm}/>
                </TouchableOpacity>
*/