import PropTypes from 'prop-types';
import React from 'react';

import ReactPagination from 'react-bootstrap/Pagination';

const NUM_PAGE_BUTTONS = 5;

export default class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      numPages: this.props.numPages,
      display: [1]
    };

    this.renderPageButtons = this.renderPageButtons.bind(this);

    this.goToPage = this.goToPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount() {
    this.renderPageButtons();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.numPages !== this.props.numPages){
      this.renderPageButtons();
    }
  }

  renderPageButtons = () => {
    let display = [];

    if (this.props.numPages < NUM_PAGE_BUTTONS){
      // Display all pages
      for (let i = 0; i < this.props.numPages; i++){
        display.push(i+1);
      }
    } else {
      // Display page buttons based on current page
      let center_min = Math.ceil(NUM_PAGE_BUTTONS/2);
      let center_max = this.state.numPages - center_min + 1;

      let center = Math.max(Math.min(this.state.currentPage, center_max), center_min);
      display = [center-2, center-1, center, center+1, center+2];
    }

    this.setState({ display: display });
  };

  goToPage = (event) => {
    let page = parseInt(event.target.innerText);
    this.setState({ currentPage: page }, this.renderPageButtons);
  };

  prevPage = () => {
    this.setState({ currentPage: Math.max(this.state.currentPage - 1, 1) }, this.renderPageButtons);
  };

  nextPage = () => {
    this.setState({ currentPage: Math.min(this.state.currentPage + 1, this.state.numPages) }, this.renderPageButtons);
  };

  firstPage = () => {
    this.setState({ currentPage: 1 }, this.renderPageButtons);
  };

  lastPage = () => {
    this.setState({ currentPage: this.state.numPages }, this.renderPageButtons);
  };

  render() {
    let self = this;
    return (
      <ReactPagination>
        <ReactPagination.First onClick={this.firstPage} disabled={this.state.currentPage == 1}/>
        <ReactPagination.Prev onClick={this.prevPage} disabled={this.state.currentPage == 1} />
        {
          this.state.display.map((page, index) => {
            return <ReactPagination.Item eventKey={index}
                                         onClick={this.goToPage}
                                         active={page == self.state.currentPage}>
                      {page}
                   </ReactPagination.Item>
          })
        }
        <ReactPagination.Next onClick={this.nextPage} disabled={this.state.currentPage == this.state.numPages} />
        <ReactPagination.Last onClick={this.lastPage} disabled={this.state.currentPage == this.state.numPages} />
      </ReactPagination>
    );
  }
}
