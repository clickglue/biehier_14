import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';

//defin constants
export const CONSUMPTION_LIST_REQUEST='CONSUMPTION_LIST_REQUEST';
export const CONSUMPTION_LIST_SUCCESS='CONSUMPTION_LIST_SUCCESS';
export const CONSUMPTION_LIST_FAIL='CONSUMPTION_LIST_FAIL';

//define action creators
export const fetchConsumptionData=()=>{
    return (dispatch)=> {
        dispatch ({type:CONSUMPTION_LIST_REQUEST});
        firebase.database().ref('/consumptionData/')
        .once('value')
        .then((snapshot)=>{
            dispatch({type:CONSUMPTION_LIST_SUCCESS, payload: snapshot.val()})
        })
        .catch((error)=>{
            dispatch({type:CONSUMPTION_LIST_FAIL,payload:error})
        })
    }
}

export const registerConsumption=()=>{
    console.log('register consumption');
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
            return { ...state, loading:true }
        case CONSUMPTION_LIST_SUCCESS:
            return {...state, consumptionData: action.payload, loading:false}
        case CONSUMPTION_LIST_FAIL:
            return {...state, error:action.payload, loading:false}
        default:
            return state;
    }
};

export default reducer;