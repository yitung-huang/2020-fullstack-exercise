import PropTypes from 'prop-types';
import React from 'react';

/* Not sure why string arrays are passed as a string,
 * so this is a helper function to convert the string
 * back to an array. */
let stringToArray = (string) => {
  string = string.replace(/[\[\]\"]/g, "");
  return string.split(", ");
}

export default class ResourceFilterDisplay extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  updateFilter = (filter) => {
    // this.setState({ name });
  };

  render() {
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
        </div>

        <table>
          <tr>
            <th>Name</th>
            <th>Number of Employees</th>
            <th>Tags</th>
          </tr>
          {
            this.props.resources.map(function(resource){
              let tag_string = "";
              let resource_array = stringToArray(resource.tags);
              console.log(resource_array);
              for (let i = 0; i < resource_array.length; i++){
                tag_string += resource_array[i] + " ";
              }
              return (
                <tr>
                  <td>{resource.name}</td>
                  <td>{resource.num_employees}</td>
                  <td>{tag_string}</td>
                </tr>
              )
            })
          }
        </table>

      </div>
    );
  }
}
