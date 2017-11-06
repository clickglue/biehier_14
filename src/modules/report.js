//import
import firebase from 'firebase';
import _ from 'lodash'

//const
export const FETCH_CONSUMPTIONDATA_FAIL = 'FETCH_CONSUMPTIONDATA_FAIL'
export const FETCH_CONSUMPTIONDATA_SUCCESS = 'FETCH_CONSUMPTIONDATA_SUCCESS'

//action creators
export const getConsumptionData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/consumptions`)
            .once('value')
            .then((snapshot) => {
                const dataObj = snapshot.val();
                //make Array
                var consumptionArray = Object.values(dataObj)
                var IDArray = _.uniqBy(consumptionArray, 'id')
                var IDArrayDef = []
                IDArray.forEach((item) => {
                    IDArrayDef.push(item.id)
                })
                var ItemNameArray = _.uniqBy(consumptionArray, 'item.name')
                var ItemNameArrayDef = []
                ItemNameArray.forEach((item) => {
                    ItemNameArrayDef.push(item.item.name)
                })
                var reportSchuld = []
                for (var i = 0; i < IDArrayDef.length; i++) {
                    var schuld = 0
                    consumptionArray.forEach((item) => {
                        if (item.id === IDArrayDef[i]) {
                            schuld += (item.item.price)
                        }
                    })
                    reportSchuld.push({
                        title: IDArrayDef[i],
                        data: schuld
                    });
                }
                var reportOmzet = []
                for (var i = 0; i < ItemNameArrayDef.length; i++) {
                    var omzet = 0
                    consumptionArray.forEach((item) => {
                        if (item.item.name === ItemNameArrayDef[i]) {
                            omzet += (item.item.price)
                        }
                    })
                    reportOmzet.push({
                        title: ItemNameArrayDef[i],
                        data: omzet
                    })
                }
                dispatch({ type: FETCH_CONSUMPTIONDATA_SUCCESS, payload: { reportSchuld, reportOmzet }})
            })
            .catch((error) => {
                dispatch({ type: FETCH_CONSUMPTIONDATA_FAIL, payload: error })
            })
    }
}

//reducers

const INITIAL_STATE = {
    loaded: false,
    reportData: {

    },
    error: ''
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CONSUMPTIONDATA_FAIL:
            return { ...state, error: action.payload, loaded:false }
        case FETCH_CONSUMPTIONDATA_SUCCESS:
            return { ...state, reportData: action.payload, loaded:true, error: '' }
        default:
            return state;
    }
}
export default reducer