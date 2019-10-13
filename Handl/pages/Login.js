import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase'
import 'firebase/firestore'

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

require('console');

export default class Login extends Component {
    constructor(props){
        super()
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            response: ''
        }
    }

    logInHandler = () => {
        if (!this.state.email || !this.state.password) {
          this.state.errorMessage({ errorMessage: 'Error: Empty fields'});
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Intro'))
            .catch(error => this.setState({ errorMessage: 'Error: ' + error.message }));
        }
      }
    
    componentDidMount(){
        return fetch('http://24.72.151.67:5000/test')
            .then(response => response.json())
            .then((r) => {
                console.log(r) 
                this.setState({
                    errorMessage: '',
                    response: r[0].Name
                })
            })
            .catch(error => console.log(error));

        this.setState({
            errorMessage: ''
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.errorMessage}</Text>
                <TextInput 
                    style={styles.input}
                    placeholder= {this.state.response}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                >
                </TextInput>
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                >
                </TextInput >
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.btnText} onPress={this.logInHandler}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn}>
                            <Text style={styles.btnText} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
                        </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>Sign up with</Text>
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
        width: '90%',
        marginBottom: 1,
        borderRadius: 5,
        padding: 15
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    userBtn: {
        backgroundColor: "#5B2C6F",
        padding: 15,
        width: "100%",
        marginTop: 15,
        borderRadius: 30
    },
    btnContainer: {
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
    text: {
        marginTop: 40,
        fontSize: 18,
        textAlign: "center"
    }
});

AppRegistry.registerComponent('Login', () => Login);
    