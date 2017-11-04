import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import post from './modules/post';
import drinkers from './modules/drinkers';
import consumptions from './modules/consumptions'

const reducers = combineReducers({
  auth,
  post,
  drinkers,
  consumptions,
  //drinks,
  //consumpties,
  form: formReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

export default store;
