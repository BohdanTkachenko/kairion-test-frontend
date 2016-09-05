import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import * as productActions from '../redux/modules/product';

@asyncConnect([{
  promise(props) {
    const { store, params: { shopName } } = props;
    const { product: { list } } = store.getState();

    if (!list || !list.length) {
      return store.dispatch(productActions.list(shopName));
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
            {currentPage > 1 && (
              <span>
                <a
                  role="button"
                  onClick={::this.prevPage}
                >&larr; prev</a>
                &nbsp;|&nbsp;
              </span>
            )}

            Page {currentPage} of {pagesCount}

            {currentPage <= pagesCount && (
              <span>
                &nbsp;|&nbsp;
                <a
                  role="button"
                  onClick={::this.nextPage}
                >next &rarr;</a>
              </span>
            )}
          </h6>

          <div
            className="list-group"
            style={{
              height: 'calc(100% - 100px)',
              overflow: 'scroll',
            }}
          >
            {list.map(productId => (
              <button
                key={productId}
                type="button"
                className="list-group-item"
                onClick={this.viewProduct(productId)}
              >{productId}</button>
            ))}
          </div>
        </div>

        <div className="col-lg-6 fullHeight">
          {children}
        </div>
      </div>
    );
  }
}
