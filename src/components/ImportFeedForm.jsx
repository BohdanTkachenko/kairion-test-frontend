import _ from 'lodash';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FormField } from './FormField';

@reduxForm({
  form: 'importFeed',
  fields: [
    'feedUrl',
    'shopName',
    'csvFormat.delimiter',
    'csvFormat.quote',
    'csvFormat.columns',
  ],
  validate: (values) => {
    const errors = {};

    const requiredFields = ['feedUrl', 'shopName', 'csvFormat.columns'];
    requiredFields.forEach((key) => {
      if (!_.get(values, key)) {
        _.set(errors, key, 'Required');
      }
    });

    if (!_.get(errors, 'csvFormat.columns')) {
      const columns = _.get(values, 'csvFormat.columns', '').split(',');

      const requiredColumns = ['id', 'price'];
      for (const key of requiredColumns) {
        if (columns.indexOf(key) === -1) {
          _.set(errors, 'csvFormat.columns', `Column ${key} is required`);
          break;
        }
      }
    }

    return errors;
  },
})
export class ImportFeedForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
  };

  render() {
    const { handleSubmit, fields } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <h3>Import feed</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <FormField
              title="Feed URL"
              field={fields.feedUrl}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <FormField
              title="Shop Name"
              field={fields.shopName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <FormField
                title="Delimiter"
                field={fields.csvFormat.delimiter}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <FormField
                title="Quote"
                field={fields.csvFormat.quote}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <FormField
                title="Columns (comma-separated)"
                field={fields.csvFormat.columns}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <button
              type="submit"
              className="btn btn-primary pull-right"
            >Add feed</button>
          </div>
        </div>
      </form>
    );
  }
}
