import React, { PropTypes } from 'react';
import cx from 'classnames';

export class FormField extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
  };

  render() {
    const { title, field } = this.props;

    const hasError = field.touched && field.error;

    return (
      <div
        className={cx({
          'form-group': true,
          'has-error': hasError,
          'has-feedback': hasError,
        })}
      >
        <label className="control-label">
          {title}
        </label>

        <input
          type="text"
          className="form-control"
          value={field.value}
          onChange={field.onChange}
          onFocus={field.onFocus}
          onBlur={field.onBlur}
        />

        {hasError && (
          <span className="glyphicon glyphicon-remove form-control-feedback"></span>
        )}

        {hasError && (
          <div className="error">{field.error}</div>
        )}
      </div>
    );
  }
}
