import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions, ActionConst, Modal, Tab } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import Signin from './containers/auth/Signin';
import requireAuth from './containers/auth/requireAuth';
import requireNotAuth from './containers/auth/requireNotAuth';
import SelectDrinkers from './containers/drink/SelectDrinkers';
import Drink from './containers/drink/Drink';
import Consumptions from './containers/drink/Consumptions'
import Report from './containers/report/Report'

const icon = ({ selected, title }) => {
    return (
        <Text style={{ color: selected ? 'red' : 'black', }}>{title}</Text>
    )
}

const RouterComponent = () => (
    <Router>
        <Modal>
            <Scene
                key="root"
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.titleStyle}
            >
                <Scene
                    key="tabBar"
                    hideNavBar={true}
                    tabs={true}
                    showLabel={false}
                    activeBackgroundColor='#999'
                    activeTintColor='#000'
                    inactiveBackgroundColor="#eee"
                    tabBarPosition='bottom'
                    tabBarStyle={styles.tabBarStyle}
                    tabStyle={styles.tabStyle}
                >
                    <Scene
                        key="loginTab"
                        title="Login"
                        icon={icon}
                        initial={true}
                        component={requireNotAuth(Signin)}
                    />
                    <Scene
                        key="selectDrinkers"
                        component={requireAuth(SelectDrinkers)}
                        title="Select"
                        icon={icon}
                    />
                    <Scene
                        key="drinkTab"
                        title="Drink"
                        icon={icon}
                        component={requireAuth(Drink)}
                        title="Drink"
                    />
                    <Scene
                        key="reportTab"
                        title="Report"
                        component={requireAuth(Report)}
                        icon={icon}
                    />
                </Scene>
            </Scene>
            <Scene
                key="consumptionModal"
                title="consumption"
                modal={true}
                component={requireAuth(Consumptions)}
            />
        </Modal>
    </Router>
);

const styles = {
    navigationBarStyle: {
        backgroundColor: '#fff',
        height: 40,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    titleStyle: {
        alignSelf: 'center',
        width: 200,
        textAlign: 'center',
    },
    tabBarStyle: {
        height: 40,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
    },
    tabStyle: {
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { left: 2, bottom: 2 },
        shadowOpacity: 0.2,
    }
};

export default RouterComponent

/*<Scene key="postTab" title="Post" icon={icon}>
                        <Scene
                            key="postList"
                            component={requireAuth(PostList)}
                            title="Posts"
                            leftTitle="Sign out"
                            onLeft={() => { firebase.auth().signOut(); Actions.loginTab(); }}
                            onRight={() => Actions.postCreate()}
                            rightTitle="Add"
                        />
                        <Scene key="postCreate" component={requireAuth(PostCreate)} title="Create Post" />
                        <Scene key="postEdit" component={requireAuth(PostEdit)} title="Edit Post" />
                    </Scene>

                            sceneStyle={{ paddingTop: 65, backgroundColor: '#edecec' }}
        navigationBarStyle={styles.navigationBarStyle}
        titleStyle={{ color: '#4d4d4d' }}
                    */