import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(() => ({}))
export class BrowseShopContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object,
  };

  viewProduct(productId) {
    const { dispatch } = this.props;
    const shopName = 'aaaaaaa';

    return () => {
      dispatch(push(`/${shopName}/${productId}`));
    };
  }

  render() {
    const { children } = this.props;

    return (
      <div className="row fullHeight">
        <div className="col-lg-6 fullHeight">
          <h3>Product</h3>

          <div className="list-group">
            <button
              type="button"
              className="list-group-item"
              onClick={this.viewProduct('111')}
            >111</button>

            <button
              type="button"
              className="list-group-item"
              onClick={this.viewProduct('222')}
            >222</button>

            <button
              type="button"
              className="list-group-item"
              onClick={this.viewProduct('333')}
            >333</button>
          </div>
        </div>

        <div className="col-lg-6 fullHeight">
          {children}
        </div>
      </div>
    );
  }
}
