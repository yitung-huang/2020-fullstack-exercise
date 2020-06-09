import PropTypes from 'prop-types';
import React from 'react';

import FilterDropdown from './FilterDropdown';
import FilterInput from './FilterInput';
import SortableTable from './SortableTable';
import Pagination from './Pagination';

/* Not sure why string arrays are passed as a string,
 * so this is a helper function to convert the string
 * back to an array. */
let stringToArray = (string) => {
  string = string.replace(/[\[\]\"]/g, "");
  return string.split(", ");
}

/* Helper function to clone hash objects */
let cloneObject = (object) => {
  let newObject = {};
  for (let key in object){
    newObject[key] = object[key];
  }
  return newObject;
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

const TABLE_COLUMN_MAP = [
  { label: "Name", name: "name" },
  { label: "Number of Employees", name: "num_employees" },
  { label: "Tags", name: "tags" }
];

export default class ResourceFilterDisplay extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    let resources = [];
    for (let i = 0; i < this.props.resources.length; i++){
      resources.push(cloneObject(this.props.resources[i]));
      resources[i].tags = stringToArray(this.props.resources[i].tags);
    }

    this.state = {
      filterNumEmployees: FILTER_DROPDOWN_PROPS.conditions[0],
      filterTags: "",
      filteredResources: resources,
      resources: resources
    };

    this.setFilterNumEmployees = this.setFilterNumEmployees.bind(this);
    this.setFilterTags = this.setFilterTags.bind(this);

    this.updateFilteredResources = this.updateFilteredResources.bind(this);
  }

  setFilterNumEmployees = (key) => {
    this.setState({ filterNumEmployees: FILTER_DROPDOWN_PROPS.conditions[key] }, this.updateFilteredResources);
  };

  setFilterTags = (tag) => {
    this.setState({ filterTags: tag }, this.updateFilteredResources);
  };

  updateFilteredResources = () => {
    let filteredResources = [];

    for (let i = 0; i < this.props.resources.length; i++){
      let resource = this.state.resources[i];
      if ( this.state.filterNumEmployees( resource.num_employees ) ){
        let shouldDisplay = (this.state.filterTags == "");

        for (let i = 0; i < resource.tags.length; i++){
          if (resource.tags[i].indexOf( this.state.filterTags ) != -1){
            shouldDisplay = true;
          }
        }

        if (shouldDisplay){
          filteredResources.push(this.state.resources[i]);
        }
      }
    }

    this.setState({filteredResources: filteredResources});
  };

  render() {
    let self = this;
    return (
      <div className="customer-list__container my__container">
        <h1 className="customer-list__heading">{this.props.name}</h1>
        <div className="filter__container">
          <div className="form__entry">
            <p className="form__label">Filter by tags: </p>
            <FilterInput placeholder="Filter by tag name ..."
                         callback={this.setFilterTags} />
          </div>
          <div className="form__entry">
            <p className="form__label">Filter by number of employees:</p>
            <FilterDropdown items={FILTER_DROPDOWN_PROPS.items}
                            callback={this.setFilterNumEmployees} />
          </div>
        </div>
        <SortableTable resources={this.state.filteredResources} map={TABLE_COLUMN_MAP}/>
        <Pagination numPages={11}/>
      </div>
    );
  }
}
