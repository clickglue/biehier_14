
//import
import _ from 'lodash';
import { connect } from 'react-redux';
import { drinkersListRequest } from '../../modules/drinkers';
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import { Spinner } from '../../components/common';
import Drinker from './Drinker'

//define class
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
                        renderRow={(item) => <Drinker id={item.id} key={item.id} context={'selectScreen'} />}
                        enableEmptySections={true}
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
  const { loading, error, drinkersList } = drinkers;
  var items = _.map(drinkersList,(value,id)=>{
      
      return {id,...value}
  })
  return { loading, error, list: items};
};

export default connect(mapStateToProps, { drinkersListRequest })(SelectDrinkers);