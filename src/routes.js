import React from 'react';
import { Route } from 'react-router';
import {
  AppContainer,
  BrowseShopContainer,
  ViewProductContainer,
} from './containers';

export default () => (
  <Route
    path="/"
    component={AppContainer}
  >
    <Route
      path="/:shopName"
      component={BrowseShopContainer}
    >
      <Route
        path=":productName"
        component={ViewProductContainer}
      />
    </Route>
  </Route>
);
