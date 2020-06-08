import PropTypes from 'prop-types';
import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

export default class FilterDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.items[0]
    };

    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle = (key) => {
    if (this.state.selected != this.props.items[key]){
      this.setState({selected: this.props.items[key]});
    }

    this.props.callback(key);
  };

  render() {
    let self = this;
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {this.state.selected}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.items.map((item, index) => {
            return <Dropdown.Item eventKey={index} onSelect={self.updateTitle}>{item}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
