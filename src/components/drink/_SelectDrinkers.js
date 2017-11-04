import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import { Spinner } from '../common';
import Drinker from '../../containers/drink/Drinker'

const propTypes = {
    drinkersListRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
};

class SelectDrinkers extends Component {

    componentWillMount() {
        this.props.drinkersListRequest();

    }
    updateDataSource(items) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(items)
        return this.dataSource
    }
    //groetjes Sa
    render() {
        return (
            <View style={styles.container}>
                {this.props.loading
                    ?
                    <Spinner />
                    :
                    <ListView
                        contentContainerStyle={styles.list}
                        dataSource={this.updateDataSource(this.props.list)}
                        renderRow={(item) => <Drinker id={item.id} key={item.id} selectScreen={true} />}
                        enableEmptySections={true}
                    />
                }
            </View>
        );
    }
}

// define your styles
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

SelectDrinkers.propTypes = propTypes

export default SelectDrinkers