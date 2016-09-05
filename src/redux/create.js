import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import { makeRootReducer } from './reducers';

export default function createStore(history, initialState = {}) {
  const middleware = [
    createLogger({
      duration: true,
      collapsed: true,
      diff: true,
    }),
    clientMiddleware(),
    routerMiddleware(history),
  ];

  const enhancers = [];
  if (process.env.NODE_ENV !== 'production') {
    const { persistState } = require('redux-devtools');
    const { DevTools } = require('../containers');
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    enhancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }

  const store = _createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
     const reducers = require('./reducers').default;
     store.replaceReducer(reducers(store.asyncReducers));
   });
  }

  return store;
}
