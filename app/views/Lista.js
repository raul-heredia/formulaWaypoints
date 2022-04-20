import React from 'react';
import { Text, View, FlatList, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { circuitos } from '../data/circuitos';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 22,
        width: Dimensions.get('screen').width,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    img: {
        width: 159.5,
        height: 119.5
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        marginLeft: 5,
        color: "#FF1801"
    }
});

export class Lista extends React.Component {
    render() {
        return (
            <View>
                <FlatList
                    data={circuitos.filter(circuito => circuito.tipo == "actual")}
                    renderItem={({ item }) => <View style={styles.container} key={item.circuito}><Image source={item.imagen} style={styles.img} /><Text style={styles.text}>{item.circuito} {"\n\n"} Celebración: {item.fecha}</Text></View>}
                    keyExtractor={item => item.circuito}
                >
                </FlatList>
            </View >
        );
    }
}