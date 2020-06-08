import PropTypes from 'prop-types';
import React from 'react';

export default class FilterInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form >
        <input
          type="text"
          onChange={(e) => this.props.callback(e.target.value)}
          placeholder={this.props.placeholder}
        />
      </form>
    );
  }
}
