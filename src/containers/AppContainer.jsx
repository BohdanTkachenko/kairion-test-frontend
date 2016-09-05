import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(() => ({}))
export class AppContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object,
  };

  browseShop(shopName) {
    const { dispatch } = this.props;

    return () => {
      dispatch(push(`/${shopName}`));
    };
  }

  render() {
    const { children } = this.props;

    return (
      <div className="row fullHeight">
        <div className="col-lg-3 fullHeight" style={{ paddingLeft: 30 }}>
          <h3>Shop</h3>

          <div className="list-group">
            <button
              type="button"
              className="list-group-item"
              onClick={this.browseShop('aaaaaaa')}
            >aaaaaaa</button>

            <button
              type="button"
              className="list-group-item"
              onClick={this.browseShop('bbbbbbb')}
            >bbbbbbb</button>

            <button
              type="button"
              className="list-group-item"
              onClick={this.browseShop('ccccccc')}
            >ccccccc</button>
          </div>
        </div>
        <div className="col-lg-9 fullHeight">
          {children}
        </div>
      </div>
    );
  }
}
