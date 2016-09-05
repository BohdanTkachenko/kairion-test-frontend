import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';
import { ImportFeedForm } from '../components';

@connect(() => ({}))
export class ImportFeedContainer extends React.Component {
  async importFeed(data) {
    data.csvFormat.columns = data.csvFormat.columns.split(',');

    if (data.csvFormat.delimiter === '\\t') {
      data.csvFormat.delimiter = '\t';
    }

    try {
      const res = await fetch('/api/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (res.status !== 200 || !body.success) {
        let message = 'Unexpected error occured';
        if (body.message) {
          message = body.message;
        }

        toastr.error(message);
        return;
      }

      toastr.success(body.message || 'OK');
    } catch (err) {
      toastr.error(err.message);
    }
  }

  render() {
    return (
      <div className="fullHeight row">
        <div className="col-lg-6">
          <ImportFeedForm onSubmit={::this.importFeed} />
        </div>
      </div>
    );
  }
}
