//@ts-nocheck
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Text, ScrollView, Image, Dimensions, View, FlatList, StyleSheet } from 'react-native';
import { HeadingText, HomeWrapper, StyledBtn } from '../styles';
import APIProvider, { APIContext } from '../contexts/API';
import { useGlobalContext } from '../contexts/Global';

const { width } = Dimensions.get('window');
import BleManager from 'react-native-ble-manager';
import Button from 'react-native-really-awesome-button';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import ConnectBluetooth from '../components/ConnectBluetooth';

export default ({ navigation }) => {

    const [isScanning, setIsScanning] = useState(false);
    const [devices, setDevices] = useState([]);



    return (
        <HomeWrapper>

            <ConnectBluetooth/>

        </HomeWrapper>
    );
};



const styles = StyleSheet.create({
    firstChart: {
      marginBottom: 20,
    },
    chartsWrapper: {
      padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    text: {
        color:"black"
    },
    button: {
        color:"black",
        width: "50px"
    }
})