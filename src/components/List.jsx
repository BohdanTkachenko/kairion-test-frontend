import React, { PropTypes } from 'react';

export class List extends React.Component {
  static propTypes = {
    onItemSelect: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
  };

  render() {
    const { list, onItemSelect } = this.props;

    return (
      <div
        className="list-group"
        style={{
          height: 'calc(100% - 100px)',
          overflow: 'scroll',
        }}
      >
        {list.map(item => (
          <button
            key={item}
            type="button"
            className="list-group-item"
            onClick={onItemSelect(item)}
          >{item}</button>
        ))}
      </div>
    );
  }
}
