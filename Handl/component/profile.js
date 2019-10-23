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
        super();
        this.state = {
            isLoadingComplete: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            checked: true,
            switchPHValue: false,
            switchFBValue: false,
            switchLIValue: false,
            text: ''
        };
        this.key = 'contactData';
        this.item = {
            /*
            cards: [
                    {display: true, name: 'phone', data: 
                        {
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            emailAddress: ''
                        }
                    },
                    {display: true, name: 'facebook', data: 'https://www.facebook.com/kenneth7882'},
                    {display: true, name: 'linkedin', data: 'www.linkedin.com/in/kc-kenneth-huang'},
                ]
            */
            };
    }
  /*  _downloadDataStartup = () =>{
        this._downloadData('kenneth');
    }
    _downloadDataBtn = () =>{
        this._downloadData('user2');
    }*/
    componentDidMount(){
        this._downloadDataKenneth();
    }

    _downloadDataKenneth = async () => {
        try {
            let result = await fetch('https://gthandl.herokuapp.com/users/kenneth');
            this.item = await result.json();
        }catch(error){
            console.log(error);
        }

        console.log(this.item);
        // populate input fields
        for (let index = 0; index < this.item.cards.length; index++) {
            const element = this.item.cards[index];
            if(element.name == 'phone'){
                this.setState({switchPHValue: element.display});
                this.setState({firstName: element.data.firstName});
                this.setState({lastName: element.data.lastName});
                this.setState({phoneNumber: element.data.phoneNumber});
                this.setState({emailAddress: element.data.emailAddress});
            }else if(element.name == 'facebook'){
                this.setState({switchFBValue: element.display});
                // set related field with element.data
            }else if(element.name == 'linkedin'){
                this.setState({switchLIValue: element.display});
                // set related field with element.data
            }
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

    }

    _downloadData = async () => {
        try {
            let result = await fetch('https://gthandl.herokuapp.com/users/user2');
            this.item = await result.json();
        }catch(error){
            console.log(error);
        }

        console.log(this.item);
        // populate input fields
        for (let index = 0; index < this.item.cards.length; index++) {
            const element = this.item.cards[index];
            if(element.name == 'phone'){
                this.setState({switchPHValue: element.display});
                this.setState({firstName: element.data.firstName});
                this.setState({lastName: element.data.lastName});
                this.setState({phoneNumber: element.data.phoneNumber});
                this.setState({emailAddress: element.data.emailAddress});
            }else if(element.name == 'facebook'){
                this.setState({switchFBValue: element.display});
                // set related field with element.data
            }else if(element.name == 'linkedin'){
                this.setState({switchLIValue: element.display});
                // set related field with element.data
            }
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

    }

    _storeData = async () => {    
        this.item.cards = [];
        if(this.state.switchPHValue){
            this.item.cards.push({display: true, name:'phone', data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                emailAddress: this.state.emailAddress,
            }});
        }else{
            this.item.cards.push({display: false, name:'phone', data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                emailAddress: this.state.emailAddress,
            }});
        }
        if(this.state.switchFBValue){
            this.item.cards.push({display: true, name: 'facebook', data: 'https://www.facebook.com/kenneth7882'});
        }else{
            this.item.cards.push({display: false, name: 'facebook', data: 'https://www.facebook.com/kenneth7882'});
        }
        if(this.state.switchLIValue){
            this.item.cards.push({display: true, name: 'linkedin', data: 'https://www.linkedin.com/in/kc-kenneth-huang'});
        }else{
            this.item.cards.push({display: false, name: 'linkedin', data: 'https://www.linkedin.com/in/kc-kenneth-huang'});
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

        // upload profile to backend
        try {
            fetch('https://gthandl.herokuapp.com/users/user2', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
                this.item
            ),
            });
        }catch(error){
            console.log(error);
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
                    <Text>Phone</Text>
                    <Switch onValueChange={() => this.setState({switchPHValue: !this.state.switchPHValue})} value = {this.state.switchPHValue} />
                </View>
                <View style={styles.btnContainer}>
                    <Text>Facebook</Text>
                    <Switch onValueChange={() => this.setState({switchFBValue: !this.state.switchFBValue})} value = {this.state.switchFBValue} />
                </View>
                <View style={styles.btnContainer}>
                    <Text>LinkedIn</Text>
                    <Switch onValueChange={() => this.setState({switchLIValue: !this.state.switchLIValue})} value = {this.state.switchLIValue} />
                </View>
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn} onPress={this._storeData}>
                            <Text style={styles.btnText} >Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn} onPress={this._downloadData}>
                            <Text style={styles.btnText} >Download Data</Text>
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