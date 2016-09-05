import 'babel-polyfill';
import 'react-redux-toastr/src/less/index.less';
import './styles/app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';

import createStore from './redux/create';
import getRoutes from './routes';

const browserHistoryUseScroll = useScroll(() => browserHistory)();
const store = createStore(
  browserHistoryUseScroll,
  {},
);

const history = syncHistoryWithStore(browserHistoryUseScroll, store);
const component = (
  <Router
    history={history}
    routes={getRoutes(store)}
    render={(props) =>
      <ReduxAsyncConnect
        {...props}
        filter={item => !item.deferred}
      />
    }
  />
);

const dest = document.getElementById('app');
ReactDOM.render(
  <Provider store={store} key="provider">
    <div className="fullHeight">
      {component}
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"
      />
    </div>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  if (!window.devToolsExtension) {
    const { DevTools } = require('./containers');
    ReactDOM.render(
      <Provider store={store} key="provider">
        <div className="fullHeight">
          {component}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            position="top-left"
          />
          <DevTools />
        </div>
      </Provider>,
      dest
    );
  }
}
