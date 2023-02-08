import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Uploaded from '../Uploaded';
import firebase from 'firebase/app';
import 'firebase/storage';
import { createProject, addInfo } from '../../store/actions/projectActions';
import Collapsible from 'react-collapsible';
// import Modal from './Modal';




class ProjectDetails extends Component {    

    handleChange = (e) => {
        const {project} = this.props;
        this.setState({
            [e.target.id]: [
                ...project.additionalNotes, 
                e.target.value
            ]
        })
    }


    handleClick = (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(file.name).put(file);
        const uploader = document.getElementById('uploader');
        const onComplete = document.getElementById('onComplete');
        const {project} = this.props;
        
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onComplete.innerHTML = 'Upload is ' + progress + '% done'
            uploader.value = progress;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: 
                break;
              case firebase.storage.TaskState.RUNNING:
                break;
              default:
            }
          }, 
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                break;
              case 'storage/canceled':
                break;
              case 'storage/unknown':
                break;
              default:  
            }
          }, 
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              const relatedFile = file.name
              onComplete.innerHTML = 'file has been successfully uploaded';
               this.setState({
                relatedFile:  [...project.relatedFile, relatedFile],
                url: [...project.url, url]
               })
            });
          }
        );
        }
  
    handleSubmit = (e) => {
        const id = this.props.match.params.id;
        e.preventDefault();       
            this.props.addInfo({
                ...this.props.project,
                ...this.state,
            }, id);
       };


    render() {
        const { project, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-1">
                        <div className="card-content row">
                        <div className="card-content right address">Address: {project.address}</div>
                            <span className="card-title"><h5>{project.title}</h5></span>
                            <p>{project.content}</p>
                            <div>
                                 { project.additionalNotes && project.additionalNotes.map((note, index) => {
                                     return(
                                        <Collapsible trigger="Additional notes" className='additional' key={index}>
                                       <ul>
                                         <li>
                                           <div>{note.updatedAt}</div>
                                           <div>{note}</div>
                                         </li>
                                         <div>added at: {moment(project.updatedAt.toDate()).calendar()}</div>
                                       </ul>
                                       </Collapsible>
                                     )   
                                 })}
                            </div>
                             <div className="related">Related files:
                              <Uploaded project={project} />
                            </div>
                            <form onSubmit={this.handleSubmit} className="white">
                               <div className="input-field">
                                  <label htmlFor="content">additional notes</label>
                                  <textarea id="additionalNotes" className="materialize-textarea" onChange={this.handleChange}></textarea>
                               </div>
                               <div onChange={this.handleClick} className="file-field input-field">
                                    <div className="btn z-depth-1 col s2">
                                        Add files
                                    </div>
                                    <input type="file" />
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" id="inputs" placeholder="Browse files" />
                                    </div>
                                </div>
                                <progress value='0' max='100' id='uploader'>0%</progress>
                                 <div id='onComplete'></div>
                                <button className="btn z-depth-1 right"> Submit </button>
                            </form>
                            {/*<Modal />*/}
                            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                            <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            <button data-target="modal1" className="waves-effect waves-light btn modal-trigger lower" href="#modal1" onClick={this.handleSubmit}>Ready</button>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container center'>
                    <p>Loading project...</p>
                </div>
            )
        }

    }


}



const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    const relatedFile = projects ? project.relatedFile : null;
    const url = project ? project.url : null;
  
    return {
        project: project,
        auth: state.firebase.auth,
        relatedFile: relatedFile,
        url: url,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)),
        addInfo: (project, id) => dispatch(addInfo(project, id))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);

