import PropTypes from 'prop-types';
import React from 'react';

let SORT_BY = ( attribute ) => {
  return {
    ASCENDING: (a, b) => {
      if ( a[attribute] > b[attribute] ){
        return 1;
      } else if ( a[attribute] < b[attribute] ){
        return -1;
      } else {
        return 0;
      }
    },
    DESCENDING: (a, b) => {
      if ( a[attribute] > b[attribute] ){
        return -1;
      } else if ( a[attribute] < b[attribute] ){
        return 1;
      } else {
        return 0;
      }
    }
  };
};

let arrayToString = ( array ) => {
  let string = "";
  for (let i = 0; i < array.length; i++){
    string += array[i] + " ";
  }
  return string;
}

export default class SortableTable extends React.Component {

  constructor(props) {
    super(props);

    let sortOrder = {};
    for (let i = 0; i < this.props.map.length; i++){
      sortOrder[this.props.map[i].name] = "ASCENDING";
    }

    let sortedResource = this.props.resources.sort( SORT_BY( this.props.map[0].name ).ASCENDING );

    this.state = {
      sortBy: this.props.map[0].name,
      sortOrder: sortOrder,
      sortedResources: sortedResource
    };

    this.sortColumn = this.sortColumn.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resources !== this.props.resources){
      let sortBy = this.state.sortBy;
      let sortOrder = this.state.sortOrder[ sortBy ];
      let sortedResources = this.props.resources.sort( SORT_BY( sortBy )[ sortOrder ] );

      this.setState({ sortedResources: sortedResources });
    }
  }

  sortColumn(event) {
    let column_name = event.target.innerText;
    let attribute_name = "";
    for (let i = 0; i < this.props.map.length; i++){
      if (this.props.map[i].label == column_name){
        attribute_name = this.props.map[i].name;
      }
    }

    let sortOrder = this.state.sortOrder;
    sortOrder[attribute_name] = (this.state.sortOrder[attribute_name] == "ASCENDING")? "DESCENDING" : "ASCENDING";

    let sortedResource = this.state.sortedResources.sort( SORT_BY( attribute_name )[ sortOrder[attribute_name] ] );

    this.setState({
      sortBy: attribute_name,
      sortOrder: sortOrder,
      sortedResource: sortedResource
    });
  };

  render() {
    let self = this;
    let entries = this.state.sortedResources.slice(0, this.props.maxEntries);
    return (
      <table className="table__sortable">
        <tr>
          { // Loop through the column names
            this.props.map.map((object, index) => {
              return (<th key={index} onClick={self.sortColumn}>{ object.label }</th>);
            })
          }
        </tr>
        { // Loop through each item
          entries.map((resource, index) => {
            return (
              <tr key={index}>
                { // Loop through each mapped attribute
                  self.props.map.map((mapObject) => {
                    let value = resource[mapObject.name];

                    // If content is an array, convert to string first
                    if (typeof value == "object" && value.length){
                      return (<td>{ arrayToString( value ) }</td>);
                    } else {
                      return (<td>{ value }</td>);
                    }
                  })
                }
              </tr>
            );
          })
        }
      </table>
    );
  }
}
