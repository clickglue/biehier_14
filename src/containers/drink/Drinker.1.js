
import _ from 'lodash';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux';
import { toggleSelected } from '../../modules/drinkers';
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// create a component
class Drinker extends Component {
    screen=this.props.context

    selected(selected) {
        if (selected && this.screen==='selectScreen') {
            return (
                <Image style={styles.image} position='absolute' source={require('../../assets/checkmark.png')} />
            )
        }
    }
    touchHandler() {
        if (this.screen==='selectScreen') {
            var newDrinkersList = Object.assign({}, this.props.dr)
            newDrinkersList[this.props.id].selected = !(newDrinkersList[this.props.id].selected)
            this.props.toggleSelected(newDrinkersList);
        } else if (this.screen==='drinkScreen'){
            Actions.consumptionModal({id:this.props.id})
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

//define props

/*
Drinker.propTypes = {
    toggleSelected: PropTypes.func.isRequired,
    dr: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    selectScreen:PropTypes.bool.isRequired
};
*/

//
const mapStateToProps = ({ drinkers }, props) => {
    const { loading, error, drinkersList } = drinkers;
    return {dr:drinkersList, id: props.bid}
};

export default connect(mapStateToProps, { toggleSelected })(Drinker);