//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Spinner } from '../../components/common/Spinner'
import { connect } from 'react-redux';
import { getConsumptionData } from '../../modules/report'
import {
    Cell,
    Section,
    Separator,
    TableView,
} from 'react-native-tableview-simple';

// create a component
class Report extends Component {
    componentWillMount() {
        console.log('Reprot props:', this.props);
        this.props.getConsumptionData()
    }

    renderItem({ item, index }) {
        return <Text style={styles.row}>{rowData}</Text>
    }
    dataUpdate() {
        this.props.getConsumptionData()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Report</Text>
                {!this.props.loaded ?
                    <Spinner />
                    :
                    <View style={styles.parent}>
                        <View style={styles.two}>
                            <FlatList
                                style={styles.list}
                                data={this.props.reportSchuld}
                                renderItem={({ item, separators }) =>
                                        <Cell
                                            cellStyle="RightDetail"
                                            title={this.props.drinkersList[item.title].naam}
                                            detail={`€ ${item.data}`}
                                            rightDetailColor="#6cc644"
                                        />}
                                ItemSeparatorComponent={({ highlighted }) =>
                                    <Separator isHidden={highlighted} />
                                }
                            />
                        </View>
                        <View style={styles.separator}>
                        </View>
                        <View style={styles.two}>
                            <FlatList
                                style={styles.list}
                                data={this.props.reportOmzet}
                                renderItem={({ item, separators }) =>
                                    <View>
                                        <Cell
                                            cellStyle="RightDetail"
                                            title={item.title}
                                            detail={`€ ${item.data}`}
                                            rightDetailColor="#6cc644"
                                        />
                                    </View>}
                                ItemSeparatorComponent={({ highlighted }) =>
                                    <Separator isHidden={highlighted} style={styles.separator}/>
                                }
                            />
                        </View>
                        <View style={styles.three}>
                            <TouchableOpacity style={styles.button} onPress={this.dataUpdate.bind(this)}>
                                <Text>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    one: {
        flex: 3,
    },
    two: {
        flex: 3
    },
    three: {
        flex: 3
    },
    welcome: {

    },
    row: {

    },
    text: {
        color: 'white'
    },
    list: {
        width:400
    },
    separator:{
        height:20,
    },
    button:{
        width:'auto',
        height:40,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    }
});

mapStateToProps = ({ report, drinkers }) => {
    const { loaded, error, reportData } = report
    const { drinkersList } = drinkers
    return { loaded, error, drinkersList, reportSchuld: reportData.reportSchuld, reportOmzet: reportData.reportOmzet }
}

//make this component available to the app
export default connect(mapStateToProps, { getConsumptionData })(Report);
