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
import { CheckBox } from 'react-native-elements'

export default class AddContact extends Component {

    constructor(props) {
        super()
        this.state = {
            isLoadingComplete: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            checked: true,
            text: ''
        }
    }
    
    handleChange = key => val => {
        console.log(key)
        /*
        this.setState({
            [key]: val
        })
        */
    }

    render() {
        return (
            <View>
                <TextInput placeholder="First Name" value={this.state.firstName} style={styles.input} onChangeText={(firstName) => this.setState({firstName})}/>
                <TextInput placeholder="Last Name" value={this.state.lastName} style={styles.input} onChangeText={(lastName) => this.setState({lastName})}/>
                <TextInput placeholder="Phone Number" value={this.state.phoneNumber} style={styles.input} onChangeText={(phoneNumber) => this.setState({phoneNumber})}/>
                <CheckBox
                    title='Send Your Contact'
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                />
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn}>
                            <Text style={styles.btnText}>Save</Text>
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