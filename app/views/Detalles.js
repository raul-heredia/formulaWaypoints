import React from 'react';
import { StyleSheet, Button, Text, View, Image, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { circuitos } from '../data/circuitos';
import { db, initDb, insertDb } from '../data/sqlite'

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
    },
    containerImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    preview: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    capture: {
        width: 200,
        height: 40,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,

    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    },
    Button: {
        width: 200,
        height: 200,
    }
});
export class Detalles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            image: null,
            setImage: null
        };
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.state.setImage = result.uri;
            console.log(this.state.setImage);
        }
    };
    render() {
        let circuitoParam = this.props.route.params.circuito;
        let circuito = circuitos.find(c => c.circuito == circuitoParam)
        let circuitoSqlite = circuitoParam.replace(/\s/g, '');
        initDb(circuitoSqlite);
        insertDb(circuitoSqlite);
        return (
            <View style={styles.container}>
                <Text style={styles.title(circuito.tipo)}>{circuito.circuito}</Text>
                <Text style={styles.subTitle}>{circuito.gp ? circuito.gp : circuito.pais}</Text>
                <Text style={styles.normalFont}>Layout: </Text>
                <Image source={circuito.imagen} style={styles.img} />
                <View>
                    <Button
                        onPress={() => this.pickImage()}
                        title="Seleccionar Imagen de la Galería"
                        color="#FF1801" />
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Camara')}
                        title="Cámara"
                        color="#8E24AA"
                    />
                </View>
            </View>
        );
    }
}
