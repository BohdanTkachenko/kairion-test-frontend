import React from 'react';
import { Route } from 'react-router';
import {
  AppContainer,
  ImportFeedContainer,
  BrowseShopContainer,
  ViewProductContainer,
} from './containers';

export default () => (
  <Route
    path="/"
    component={AppContainer}
  >
    <Route
      path="/import"
      component={ImportFeedContainer}
    />

    <Route
      path="/:shopName"
      component={BrowseShopContainer}
    >
      <Route
        path=":productId"
        component={ViewProductContainer}
      />
    </Route>
  </Route>
);
