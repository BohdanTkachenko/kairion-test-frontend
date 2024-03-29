import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import * as productActions from '../redux/modules/product';
import { ViewProduct } from '../components';

@asyncConnect([{
  promise(props) {
    const { store, params: { shopName, productId } } = props;
    return store.dispatch(productActions.get(shopName, productId));
  }
}])
@connect((state) => ({ price: state.product.product }))
export class ViewProductContainer extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
  };

  render() {
    const { price, params: { productId } } = this.props;

    return (
      <div className="fullHeight row">
        <div className="col-lg-12">
          <ViewProduct
            productId={productId}
            price={price}
          />
        </div>
      </div>
    );
  }
}
