import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { circuitos } from '../data/circuitos';

export class Detalles extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let circuitoParam = this.props.route.params.circuito;
        return (
            <View>
                <Text> Detalles {circuitoParam} </Text>
            </View>
        );
    }
}
