import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import * as productActions from '../redux/modules/product';
import { Paginator, List } from '../components';

@asyncConnect([{
  promise(props) {
    const { store, params } = props;
    const { product: { shopName } } = store.getState();

    if (params.shopName !== shopName) {
      return store.dispatch(productActions.list(params.shopName));
    }

    return null;
  }
}])
@connect((state) => ({
  list: state.product.currentPageList,
  currentPage: state.product.currentPage,
  pagesCount: state.product.pagesCount,
}))
export class BrowseShopContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    children: PropTypes.object,
    list: PropTypes.array.isRequired,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
  };

  viewProduct(productId) {
    const { dispatch, params: { shopName } } = this.props;

    return () => {
      dispatch(push(`/${shopName}/${productId}`));
    };
  }

  prevPage() {
    this.props.dispatch(productActions.prevPage());
  }

  nextPage() {
    this.props.dispatch(productActions.nextPage());
  }

  render() {
    const {
      children,
      params: { shopName },
      list,
      currentPage,
      pagesCount,
    } = this.props;

    return (
      <div className="row fullHeight">
        <div className="col-lg-6 fullHeight">
          <h3>Products in {shopName}</h3>

          <h6 style={{ textAlign: 'right' }}>
            <Paginator
              prevPage={::this.prevPage}
              nextPage={::this.nextPage}
              currentPage={currentPage}
              pagesCount={pagesCount}
            />
          </h6>

          <List
            list={list}
            onItemSelect={::this.viewProduct}
          />
        </div>

        <div className="col-lg-6 fullHeight">
          {children}
        </div>
      </div>
    );
  }
}
