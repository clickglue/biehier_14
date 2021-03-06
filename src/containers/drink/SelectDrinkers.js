
//import
import _ from 'lodash';
import { connect } from 'react-redux';
import { drinkersListRequest, toggleSelected } from '../../modules/drinkers';
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Spinner } from '../../components/common';
import Drinker from './Drinker'

//define class
class SelectDrinkers extends Component {

    componentWillMount() {
        this.props.drinkersListRequest();

    }
    toggleSelectedDrinker(id) {
        newDrinkersList = Object.assign({}, this.props.drinkersList)
        newDrinkersList[id].selected = !(newDrinkersList[id].selected)
        this.props.toggleSelected(newDrinkersList)
    }

    keyExtractor=(item,index)=>item.id

    render() {
        return (
            <View style={styles.container}>
                {!this.props.loaded
                    ?
                    <Spinner />
                    :
                    <FlatList
                        numColumns={2}
                        data={this.props.items}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => <Drinker
                            id={item.id}
                            key={item.id}
                            naam={item.naam}
                            foto={item.foto}
                            selected={item.selected}
                            toggle={(id) => this.toggleSelectedDrinker(id)}
                            context={'selectScreen'}
                        />
                        }
                    />
                }
            </View>
        );
    }
}

// define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    text: {
        color: '#FFF'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item: {
        backgroundColor: 'red',
        margin: 30,
        width: 100
    }

});
//define props
/*
SelectDrinkers.propTypes = {
    drinkersListRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
};
*/

//connect to store
const mapStateToProps = ({ drinkers }) => {
    const { loaded, error, drinkersList } = drinkers;
    var items = _.map(drinkersList, (value, id) => {
        return { id, ...value }
    })
    return { loaded, error, drinkersList, items };

};

export default connect(mapStateToProps, { drinkersListRequest, toggleSelected })(SelectDrinkers);