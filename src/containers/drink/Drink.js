
//import
import _ from 'lodash';
import { connect } from 'react-redux';
import { drinkersListRequest, toggleSelected } from '../../modules/drinkers';
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Spinner } from '../../components/common';
import Drinker from './Drinker'

//define class
class Drink extends Component {

    itemsSelected(){
        const selectedItems=this.props.items.filter((item)=>{
            if(item.selected){return item}
        })
        return selectedItems
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
                        data={this.itemsSelected()}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => <Drinker
                            id={item.id}
                            key={item.id}
                            naam={item.naam}
                            foto={item.foto}
                            selected={item.selected}
                            context={'drinkScreen'}
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

//connect to store
const mapStateToProps = ({ drinkers }) => {
    const { loaded, error, drinkersList } = drinkers;
    var items = _.map(drinkersList, (value, id) => {
        return { id, ...value }
    })
    return { loaded, error, drinkersList, items };

};

export default connect(mapStateToProps, { drinkersListRequest, toggleSelected })(Drink);