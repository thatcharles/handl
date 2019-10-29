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

export default class Intro extends Component {

    constructor(props){
        super()
        this.state = {
            isFinished: false
        }
    }

    GoToHome = () => {
        this.setState({
            isFinished: true
        })

        if (this.state.isFinished) {
            this.props.navigation.navigate('Home')
        } else {

        }
    }

    render() {
        return (
            <View>
                <Text>
                    Intro Here
                </Text>
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.btnText} onPress={this.GoToHome}>Let's Get Started!</Text>
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
})