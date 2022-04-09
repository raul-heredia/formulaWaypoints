import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { circuitos } from '../data/circuitos';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
});
const mode = 'driving'; // 'walking';
export class Map extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let marcadors = circuitos.map(circuito => (
            < MapView.Marker
                key={circuito.pais}
                coordinate={{
                    latitude: circuito.lat,
                    longitude: circuito.lng,
                }}
                title={circuito.pais}
                description={circuito.circuito}
                pinColor={circuito.tipo == 'actual' ? '#FF1801' : '#8E24AA'}
            />
        ));
        return (
            <View style={styles.container} >
                <Text> Mapa </Text>
                <MapView style={styles.mapStyle} initialRegion={{
                    latitude: 41.390205,
                    longitude: 2.174007,
                    latitudeDelta: 10.0622,
                    longitudeDelta: 2.0121,
                }}>

                    {marcadors}

                    {/* <MapView.Polyline
                        coordinates={[
                            { latitude: 41.390205, longitude: 2.174007, },
                            { latitude: 41.380205, longitude: 2.175007 },

                        ]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    /> */}

                </MapView>

            </View>
        );
    }
}
/*
 <MapView.MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={AIzaSyAIks4547oo8Dl8_flmn8yICsbKq1Oq3x8} 
          strokeWidth={4}
          strokeColor="#111111"
        />
        */