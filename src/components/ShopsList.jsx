import React, { PropTypes } from 'react';

export class ProductsList extends React.Component {
  static propTypes = {
    viewProduct: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
  };

  render() {
    const { list, viewProduct } = this.props;

    return (
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
            onClick={viewProduct(productId)}
          >{productId}</button>
        ))}
      </div>
    );
  }
}
