import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Finder from './Finder';



class Dashboard extends Component {

  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s6 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s6 m6 ">
            <Notifications notifications={notifications} />
          </div>
          <div className="col s6 m6">
            <Finder />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    foundProjects: state.project.found

  };
};


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'], limit: 3 },
    { collection: 'notifications', orderBy: ['time', 'desc'], limit: 3 }
  ])
)(Dashboard);

