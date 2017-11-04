//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// create a component
class Consumption extends Component {
    touchHandler() {
        console.log('touched');
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.touchHandler()}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: this.props.icon }} />
                    <Text style={styles.text} >{this.props.name}</Text>
                </View>
            </TouchableOpacity >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 3,
    },
    text: {
        position: 'absolute',
        marginTop: 10,
        marginLeft: 10,
        color: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 15,
        paddingTop: 10,
    }
});

//make this component available to the app
export default Consumption;
