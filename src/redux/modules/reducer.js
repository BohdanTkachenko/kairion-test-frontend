import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as toastr } from 'react-redux-toastr';
import shop from './shop';

export default combineReducers({
  routing: routerReducer,
  form,
  toastr,
  reduxAsyncConnect,
  shop,
});
