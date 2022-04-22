// src/camera.page.js file
import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import Toolbar from './toolbar.component';
import { db, initDb, insertDb, loadImg } from '../../../data/sqlite';

export class Camara extends React.Component {
    camera = null;
    state = {
        hasCameraPermission: null,
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    camera = null;

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        let circuitoSqlite = this.props.route.params.circuito;
        const photoData = await this.camera.takePictureAsync();
        insertDb(circuitoSqlite, photoData.uri);
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };
    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>

                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};