import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as toastr } from 'react-redux-toastr';
import shop from './modules/shop';
import product from './modules/product';

export const makeRootReducer = (asyncReducers) =>
  combineReducers({
    routing: routerReducer,
    form,
    toastr,
    reduxAsyncConnect,
    shop,
    product,
    ...asyncReducers
  });
