import React, { PropTypes } from 'react';

export class ViewProduct extends React.Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  };

  render() {
    const { productId, price } = this.props;

    return (
      <div>
        <h3>Product {productId}</h3>

        <b>Price:</b> {price}
      </div>
    );
  }
}
