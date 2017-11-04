import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const DRINKERS_LIST_REQUEST = 'DRINKERS_LIST_REQUEST';
export const DRINKERS_LIST_UPDATE_SUCCESS = 'DRINKERS_LIST_UPDATE_SUCCESS';
export const DRINKERS_LIST_UPDATE_FAILURE = 'DRINKERS_LIST_UPDATE_FAILURE';
export const DRINKER_SELECT_SET = 'DRINKER_SELECT_SET';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const drinkersListRequest = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: DRINKERS_LIST_REQUEST });
        firebase.database().ref(`/drinkersData/`)
            .once('value')
            .then((snapshot) => {
                dispatch({ type: DRINKERS_LIST_UPDATE_SUCCESS, payload: snapshot.val() });
            })
            .catch((error) => {
                dispatch({ type: DRINKERS_LIST_UPDATE_FAILURE, payload: error })
            })
    };
};

export const toggleSelected = (value) => {
    return (dispatch) => {
        dispatch({ type: DRINKER_SELECT_SET, payload: value })
    }
}

    /**
     |--------------------------------------------------
     | Reducer
     |--------------------------------------------------
     */
    const INITIAL_STATE = {
        drinkersList: {},
        error: '',
        loaded: false,
    };

    const reducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case DRINKERS_LIST_REQUEST:
                return { ...state, loaded: false };
            case DRINKERS_LIST_UPDATE_SUCCESS:
                return { ...state, loaded: true, error: '', drinkersList: action.payload };
            case DRINKERS_LIST_UPDATE_FAILURE:
                return { ...state, error: action.payload, loaded: false };
            case DRINKER_SELECT_SET:
                return { ...state, drinkersList: action.payload }
            default:
                return state;
        }
    };

    export default reducer;
