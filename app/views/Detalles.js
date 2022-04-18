import React from 'react';
import { StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { circuitos } from '../data/circuitos';

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    title: (tipoCircuito) => ({
        fontSize: 22,
        fontWeight: 'bold',
        color: tipoCircuito == "actual" ? "#FF1801" : "#8E24AA"
    }),
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    normalFont: {
        fontSize: 18,
    },
    img: {
        alignSelf: 'center',
    }
});

export class Detalles extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let circuitoParam = this.props.route.params.circuito;
        let circuito = circuitos.find(c => c.circuito == circuitoParam)
        return (
            <View style={styles.container}>
                <Text style={styles.title(circuito.tipo)}>{circuito.circuito}</Text>
                <Text style={styles.subTitle}>{circuito.gp ? circuito.gp : circuito.pais}</Text>
                <Text style={styles.normalFont}>Layout: </Text>
                <Image source={circuito.imagen} style={styles.img} />
            </View>
        );
    }
}
