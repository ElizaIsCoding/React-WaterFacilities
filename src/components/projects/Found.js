import React, { Component } from 'react';
import ProjectSummary from '../projects/ProjectSummary';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


class Found extends Component {
  render() {
  const { foundProjects, allProjects } = this.props;
  return (
    <div className="project-list section found-section z-depth-4">
    <p className="found-text">Following found : </p>
  { foundProjects && foundProjects.map((project, index) => {
    const foundPrj = allProjects.find((pr) => pr.projectId === project.projectId)
    return(
       <div className="row" key={index}>
           <div className="col s6 m6" >
             <Link to={`/project/${foundPrj.id}`} > 
               <div className=" z-depth-1 case">
                 <ProjectSummary project={project} />
               </div>
             </Link> 
          </div>
       </div>
     )
  })}
  </div>
  )
}}



const mapStateToProps = state => {
  return {
    allProjects: state.firestore.ordered.projects,
    foundProjects: state.project.found 
  };
};


export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
      { collection: 'projects' }
  ])
)(Found);
 
