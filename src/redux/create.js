import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

export default function createStore(history, data) {
  const middleware = [
    createLogger({
      duration: true,
      collapsed: true,
      diff: true,
    }),
    createMiddleware(),
    routerMiddleware(history),
  ];

  let finalCreateStore;
  if (process.env.NODE_ENV !== 'production') {
    const { persistState } = require('redux-devtools');
    const { DevTools } = require('../containers');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(require('./modules/reducer').default, data);
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default);
    });
  }

  return store;
}
