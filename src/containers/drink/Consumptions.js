import React, { Component, PropTypes } from 'react';
import _ from 'lodash'
import { Text, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchConsumptionData, registerConsumption } from '../../modules/consumptions'
import Consumption from '../../components/drink/Consumption'

/*
const propTypes = {
    id: PropTypes.string.isRequired,
};
*/

class Consumptions extends Component {
    componentWillMount() {
        this.props.fetchConsumptionData()
    }

    updateDataSource(items) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(items)
        return this.dataSource
    }

    render() {
        return (
            <View>
                <Text>{this.props.id}</Text>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.updateDataSource(this.props.items)}
                    renderRow={(item) => <Consumption
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        icon={item.icon}
                        price={item.price}
                        touchHandler={this.props.registerConsumption}
                    //context={'selectScreen'} 
                    />}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}
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

//onsumptions.propTypes = propTypes

mapStateToProps = ({ consumptions }) => {
    const { loading, error, consumptionData } = consumptions;
    const items = _.map(consumptionData, (item, id) => {
        return { id, ...item }
    })
    return { loading, error, items }
}

export default connect(mapStateToProps, { fetchConsumptionData, registerConsumption })(Consumptions)