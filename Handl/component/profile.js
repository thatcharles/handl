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
    Label,
    Span,
    Switch,
    Button,
    Picker
    }from 'react-native';
import { CheckBox } from 'react-native-elements'
import { AsyncStorage } from "react-native";


export default class Profile extends Component {

    constructor(props) {
        super()
        this.state = {
            isLoadingComplete: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            checked: true,
            switchFBValue: false,
            switchLNValue: false,
            switchIGValue: false,
            text: ''
        }
        this.key = 'contactData';
        this.item = {
                cardNum: 3,
                cards: [
                    {name: 'phone', data: 
                        `BEGIN:VCARD
                        VERSION:3.0
                        N:Huang;Kai-Chieh
                        FN:Kai-Chieh Huang
                        ORG:mycompany
                        TEL;CELL:4045438900
                        EMAIL;WORK;INTERNET:kenneth7882@gmail.com
                        END:VCARD`
                    },
                    {name: 'facebook', data: 'https://www.facebook.com/kenneth7882'},
                    {name: 'linkedin', data: 'www.linkedin.com/in/kc-kenneth-huang'},
                ]
            }
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }
    }
    
    handleChange = key => val => {
        console.log(key)
        this.setState({
            [key]: ~val
        })
    }

    render() {
        return (
            <View>
                <TextInput placeholder="First Name" value={this.state.firstName} style={styles.input} onChangeText={(firstName) => this.setState({firstName})}/>
                <TextInput placeholder="Last Name" value={this.state.lastName} style={styles.input} onChangeText={(lastName) => this.setState({lastName})}/>
                <TextInput placeholder="Phone Number" value={this.state.phoneNumber} style={styles.input} onChangeText={(phoneNumber) => this.setState({phoneNumber})}/>
                <TextInput placeholder="Email Address" value={this.state.emailAddress} style={styles.input} onChangeText={(emailAddress) => this.setState({emailAddress})}/>
                <View style={styles.btnContainer}>
                    <Text>FaceBook</Text>
                    <Switch onValueChange={() => this.setState({switchFBValue: !this.state.switchFBValue})} value = {this.state.switchFBValue} />
                </View>
                <View style={styles.btnContainer}>
                    <Text>LinkedIn</Text>
                    <Switch onValueChange={() => this.setState({switchLNValue: !this.state.switchLNValue})} value = {this.state.switchLNValue} />
                </View>
                <View style={styles.btnContainer}>
                    <Text>Instagram</Text>
                    <Switch onValueChange={() => this.setState({switchIGValue: !this.state.switchIGValue})} value = {this.state.switchIGValue} />
                </View>
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn} onPress={this._storeData}>
                            <Text style={styles.btnText} >Save</Text>
                    </TouchableOpacity>
                </View>
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
    },
    userBtn: {
        backgroundColor: "#5B2C6F",
        padding: 15,
        width: "100%",
        marginTop: 15,
        borderRadius: 30
    },
    btnContainer: {
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "90%",
        marginTop: 10
    },
    btnText: {
        fontSize: 18,
        textAlign: "center",
        color: 'white'
    },
});