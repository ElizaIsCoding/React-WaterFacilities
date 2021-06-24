import React, { Component } from 'react';
import { findInfo } from '../../store/actions/projectActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';


class Finder extends Component {

  state = {
    searchString: '',
    casesFound: false,
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.findInfo(this.state.searchString)
    this.setState({
      casesFound: true
    })
    e.target.reset();
  }

  render() {
    if (this.state.casesFound) {
      return <Redirect to='/found' />
    }
    return (
      <div>
        <form action="/" method="get" onSubmit={this.handleSubmit}>
          <label htmlFor="header-search"></label>
          <span className="visually-hidden">Search project</span>
          <input type="search"
            id="searchField"
            placeholder="search for projects"
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    )

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    findInfo: (found) => dispatch(findInfo(found))
  }
};

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([{ collection: 'projects' }]))(Finder);