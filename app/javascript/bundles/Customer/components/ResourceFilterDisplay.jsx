import PropTypes from 'prop-types';
import React from 'react';

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
              return (
                <tr>
                  <td>{resource.name}</td>
                  <td>{resource.num_employees}</td>
                  <td>{resource.tags.toString()}</td>
                </tr>
              )
            })
          }
        </table>

      </div>
    );
  }
}
