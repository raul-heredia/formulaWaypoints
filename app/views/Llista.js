import React from 'react';
import { Text, View } from 'react-native';


export class Llista extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hola</Text>
                <Text>Test</Text>
            </View>
        );
    }
}