import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import drinkers from './modules/drinkers';
import consumptions from './modules/consumptions'
import report from './modules/report'

const reducers = combineReducers({
  auth,
  drinkers,
  consumptions,
  report,
  form: formReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

export default store;
