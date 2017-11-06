import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

//define constants
export const CONSUMPTION_LIST_REQUEST = 'CONSUMPTION_LIST_REQUEST';
export const CONSUMPTION_LIST_SUCCESS = 'CONSUMPTION_LIST_SUCCESS';
export const CONSUMPTION_LIST_FAIL = 'CONSUMPTION_LIST_FAIL';
export const CONSUMPTION_REGISTER_REQUEST = 'CONSUMPTION_REGISTER_REQUEST';
export const CONSUMPTION_REGISTER_SUCCESS = 'CONSUMPTION_REGISTER_SUCCESS';
export const CONSUMPTION_REGISTER_FAIL = 'CONSUMPTION_REGISTER_FAIL';
//define action creators
export const fetchConsumptionData = () => {
    return (dispatch) => {
        dispatch({ type: CONSUMPTION_LIST_REQUEST });
        firebase.database().ref('/consumptionData/')
            .once('value')
            .then((snapshot) => {
                dispatch({ type: CONSUMPTION_LIST_SUCCESS, payload: snapshot.val() })
            })
            .catch((error) => {
                dispatch({ type: CONSUMPTION_LIST_FAIL, payload: error })
            })
    }
}

export const registerConsumption = (id, item) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: CONSUMPTION_REGISTER_REQUEST });
        const key=firebase.database().ref(`/users/${currentUser.uid}/consumptions`).push().key
        firebase.database().ref(`/users/${currentUser.uid}/consumptions/${key}`).update({
            id,
            item,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
            dispatch({type: CONSUMPTION_REGISTER_SUCCESS})
            Actions.pop()
        }).catch((error)=>{
            dispatch({type:CONSUMPTION_REGISTER_FAIL})
        })
        
    }
}
//define reducer

const INITIAL_STATE = {
    consumptionData: {
        id: {
            name: '',
            icon: '',
            kind: '',
            price: null,
        }
    },
    loading: false,
    error: ''
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSUMPTION_LIST_REQUEST:
            return { ...state, loading: true }
        case CONSUMPTION_LIST_SUCCESS:
            return { ...state, consumptionData: action.payload, loading: false }
        case CONSUMPTION_LIST_FAIL:
            return { ...state, error: action.payload, loading: false }
        case CONSUMPTION_REGISTER_REQUEST:
            return { ...state }
        case CONSUMPTION_REGISTER_SUCCESS:
            return { ...state }
        case CONSUMPTION_REGISTER_FAIL:
            return { ...state }
        default:
            return state;
    }
};

export default reducer;