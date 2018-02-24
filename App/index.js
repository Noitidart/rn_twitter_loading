// @flow

import React, { Component } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'

import TRANS from './transparent.png'
import SOLID from './solid.png'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class App extends Component {
    state = {
        loadingProgress: new Animated.Value(0),
        isSolidLoaded: false,
        isTransLoaded: false,
        isAnimDone: false
    }

    componentDidUpdate(propsOld, stateOld) {
        const { isSolidLoaded, isTransLoaded } = this.state;
        const { isSolidLoaded:isSolidLoadedOld, isTransLoaded:isTransLoadedOld } = stateOld;

        if (isSolidLoaded !== isSolidLoadedOld || isTransLoaded !== isTransLoadedOld) {
            if (isSolidLoaded && isTransLoaded) {
                const { loadingProgress } = this.state;
                Animated.timing(loadingProgress, {
                    toValue: 100,
                    duration: 10000,
                    useNativeDriver: true
                }).start(this.setAnimDone);
            }
        }
    }

    render() {

        const { loadingProgress, isAnimDone } = this.state;

        const imgHeight = 3500;
        const imgWidth = 3500;
        const logoHeight = 64;
        const logoWidth = 64;
        const { height:winHeight, width:winWidth } = Dimensions.get('window');

        const imageTransform = [
            {
                scale: loadingProgress.interpolate({
                    inputRange: [0, 10, 100],
                    outputRange: [1, 0.8, 70],
                })
            }
        ];
        const imageOpacity = loadingProgress.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        });

        const solidStyle = {
            position: 'absolute',
            height: imgHeight,
            width: imgWidth,
            top: (-imgHeight / 2) + (winHeight / 2),
            left: (-imgWidth / 2) + (winWidth / 2),
            transform: imageTransform,
            opacity: imageOpacity
        }

        const transStyle = {
            position: 'absolute',
            height: imgHeight,
            width: imgWidth,
            top: (-imgHeight / 2) + (winHeight / 2),
            left: (-imgWidth / 2) + (winWidth / 2),
            transform: imageTransform
        }

        const appAnimStyle = {
            transform: [
                {
                    scale: loadingProgress.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1.1, 1]
                    })
                }
            ]
        }

        return (
            <View style={styles.loadingWrap}>
                <Animated.View style={[styles.container, appAnimStyle]}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                </Animated.View>
                { !isAnimDone && <Animated.Image source={{uri:'transparent'}} style={transStyle} onLoad={this.handleTransLoad} onError={this.handleTransError} /> }
                {/* { !isAnimDone && <Animated.Image source={TRANS} style={transStyle} onLoad={this.handleTransLoad} onError={this.handleTransError} /> } */}
                { !isAnimDone && <Animated.Image source={{uri:'solid'}} style={solidStyle} onLoad={this.handleSolidLoad} onError={this.handleSolidError} /> }
                {/* { !isAnimDone && <Animated.Image source={SOLID} style={solidStyle} onLoad={this.handleSolidLoad} onError={this.handleSolidError} /> } */}
            </View>
        );
    }

    handleTransLoad = () => {
        console.log('trans loaded');
        this.setState(() => ({ isTransLoaded:true }));
    }
    handleSolidLoad = () => {
        console.log('solid loaded');
        this.setState(() => ({ isSolidLoaded:true }));
    }
    handleTransError = () => {
        console.log('trans errored');
        this.setState(() => ({ isTransLoaded:true }));
    }
    handleSolidError = e => {
        console.log('solid errored, e:', Object.keys(e), JSON.stringify(e.nativeEvent));
        this.setState(() => ({ isSolidLoaded:true }));
    }
    setAnimDone = () => this.setState(() => ({ isAnimDone:true }))
}

const styles = StyleSheet.create({
    loadingWrap: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
