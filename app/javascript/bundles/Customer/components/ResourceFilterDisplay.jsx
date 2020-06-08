import PropTypes from 'prop-types';
import React from 'react';

import FilterDropdown from './FilterDropdown';

/* Not sure why string arrays are passed as a string,
 * so this is a helper function to convert the string
 * back to an array. */
let stringToArray = (string) => {
  string = string.replace(/[\[\]\"]/g, "");
  return string.split(", ");
}

const FILTER_DROPDOWN_PROPS = {
  items: [
    "Any",
    "1-10 employees",
    "11-50 employees",
    "50+ employees"
  ],
  conditions: [
    (employees) => { return true; },
    (employees) => { return employees >=  1 && employees <= 10; },
    (employees) => { return employees >= 11 && employees <= 50; },
    (employees) => { return employees >  50; }
  ]
};


export default class ResourceFilterDisplay extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.state = {
      filterNumEmployees: FILTER_DROPDOWN_PROPS.conditions[0]
    };

    this.setFilterNumEmployees = this.setFilterNumEmployees.bind(this);
  }

  setFilterNumEmployees = (key) => {
    this.setState({ filterNumEmployees: FILTER_DROPDOWN_PROPS.conditions[key] });
  };

  updateFilter = (filter) => {
    // this.setState({ name });
  };

  render() {
    let self = this;
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          <form >
            <input
              id="name"
              type="text"
              onChange={(e) => this.updateFilter(e.target.value)}
              placeholder="Filter by tag name ..."
            />
          </form>

          <FilterDropdown items={FILTER_DROPDOWN_PROPS.items}
                          callback={this.setFilterNumEmployees}/>
        </div>

        <table>
          <tr>
            <th>Name</th>
            <th>Number of Employees</th>
            <th>Tags</th>
          </tr>
          {
            this.props.resources.map(function(resource, index){
              if ( self.state.filterNumEmployees( resource.num_employees ) ){
                let tag_string = "";
                let resource_array = stringToArray(resource.tags);

                for (let i = 0; i < resource_array.length; i++){
                  tag_string += resource_array[i] + " ";
                }

                return (
                  <tr key={index}>
                    <td>{resource.name}</td>
                    <td>{resource.num_employees}</td>
                    <td>{tag_string}</td>
                  </tr>
                )
              }
            })
          }
        </table>

      </div>
    );
  }
}
