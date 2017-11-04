//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, PropTypes, TouchableOpacity } from 'react-native';

// create a component
class Drinker extends Component {
    selected(selected) {
        if (selected && this.props.selectScreen) {
            return (
                <Image style={styles.image} position='absolute' source={require('../../assets/checkmark.png')} />
            )
        }
    }
    touchHandler() {
        if (this.props.selectScreen) {
            var newDrinkersList = Object.assign({}, this.props.dr)
            newDrinkersList[this.props.id].selected = !(newDrinkersList[this.props.id].selected)
            this.props.toggleSelected(newDrinkersList);
        }
    }

    render() {
        const { id, naam, foto, functie, selected } = this.props.dr[this.props.id]
        return (
            <TouchableOpacity onPress={() => this.touchHandler()}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: foto }} />
                    {this.selected(selected)}
                    <Text style={styles.text} >{naam}</Text>
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
        backgroundColor: '#2c3e50',
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

export default Drinker;

//

//make this component available to the app
