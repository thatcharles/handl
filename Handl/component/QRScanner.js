import React, { Component } from 'react'

import { Text, View, StyleSheet, Button, Linking } from 'react-native';
import Constants from 'expo-constants';


import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

//import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRScanner extends Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {

        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting camera permission</Text>;
        }

        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >


                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        Linking.canOpenURL(data).then((supported) => {
            if (!supported) {
                alert(`Scanned: ${type} of ${data}`);
            } 
            else {
                return Linking.openURL(data);
            }
        }).catch((err) => console.error('An error occurred', err));

    };
}