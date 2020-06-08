import PropTypes from 'prop-types';
import React from 'react';

import Alert from 'react-bootstrap/Alert';

export default class FilterDropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Alert variant={this.props.variant}>
        {this.props.message}
      </Alert>
    );
  }
}
