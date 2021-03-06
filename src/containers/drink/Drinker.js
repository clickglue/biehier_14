
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
            this.props.toggle(this.props.id);
        } else if (this.screen==='drinkScreen'){
            Actions.consumptionModal({id:this.props.id})
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.touchHandler()}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: this.props.foto }} />
                    {this.selected(this.props.selected)}
                    <Text style={styles.textStyle} >{this.props.naam}</Text>
                </View>
            </TouchableOpacity >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#2c3e50',
        margin: 3,
    },
    textStyle: {
        alignSelf: 'flex-start',
        position: 'absolute',
        width:120,
        top: 10,
        left: 10,
        color: '#fff',
        fontWeight:'800',
        backgroundColor:'#0009'
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
    return {dr:drinkersList, id: props.id}
};

export default connect(mapStateToProps, { toggleSelected })(Drinker);