import React, { PropTypes } from 'react';

export class Paginator extends React.Component {
  static propTypes = {
    prevPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
  };

  render() {
    const {
      currentPage,
      pagesCount,
      prevPage,
      nextPage,
    } = this.props;

    return (
      <div>
        {currentPage > 1 && (
          <span>
            <a
              role="button"
              onClick={prevPage}
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
              onClick={nextPage}
            >next &rarr;</a>
          </span>
        )}
      </div>
    );
  }
}
