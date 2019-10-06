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

export default class Signup extends Component {

    constructor(props){
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        }
    }

    signUpHandler = () => {
        this.state.errorMessage = ''
        if (!this.state.email || !this.state.password || !this.state.confirmPassword) {
            this.setState({ errorMessage: 'Error: Empty fields'});
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Error: Passwords do not match'});
        } else {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: 'Error: ' + error.message }));
        }
    }
    
    componentDidMount() {
        this.setState({ errorMessage: '' });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.errorMessage}</Text>
                <Text style={styles.welcome}>Sign up to your app</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="ConfirmPassword"
                    secureTextEntry={true}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                />
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.btnText} onPress={this.signUpHandler}>Login</Text>
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
        backgroundColor: "#FFD700",
        padding: 15,
        width: "45%"
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "90%"
    },
    bteText: {
        fontSize: 18,
        textAlign: "center"
    }
});

AppRegistry.registerComponent('Signup', () => Signup);
    