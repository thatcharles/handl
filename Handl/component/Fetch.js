import React, {Component} from 'react';
import {AppRegistry, Activityindicator, Text, View, FlatList , StyleSheet, TouchableHighlight} from 'react-native';

export default class Fetch extends Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            DataSource: []
        };
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers(){
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    DataSource: responseJson
                });
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.DataSource}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        backgroundColor: '#f4f4f4',
        marginBottom:3
    },
    rowText: {
        flex:1
    }
});

AppRegistry.registerComponent('Fetch', () => Fetch);