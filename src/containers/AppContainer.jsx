import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import * as shopActions from '../redux/modules/shop';
import { List } from '../components';

@asyncConnect([{
  promise: props => {
    const { store } = props;
    const { shop: { list } } = store.getState();

    if (!list || !list.length) {
      return props.store.dispatch(shopActions.list());
    }

    return null;
  },
}])
@connect((state) => ({ list: state.shop.list }))
export class AppContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    children: PropTypes.object,
  };

  browseShop(shopName) {
    const { dispatch } = this.props;

    return () => {
      dispatch(push(`/${shopName}`));
    };
  }

  render() {
    const { list, children } = this.props;

    return (
      <div className="row fullHeight">
        <div className="col-lg-3 fullHeight" style={{ paddingLeft: 30 }}>
          <h3>Shop</h3>

          <h6><Link to="/import">Import feed</Link></h6>

          <List
            list={list}
            onItemSelect={::this.browseShop}
          />
        </div>
        <div className="col-lg-9 fullHeight">
          {children}
        </div>
      </div>
    );
  }
}
