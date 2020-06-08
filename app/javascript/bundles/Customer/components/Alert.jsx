import PropTypes from 'prop-types';
import React from 'react';

import ReactAlert from 'react-bootstrap/Alert';

export default class Alert extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactAlert variant={this.props.variant}>
        {this.props.message}
      </ReactAlert>
    );
  }
}
