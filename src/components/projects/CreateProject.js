
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
// import Modal from './Modal';


class CreateProject extends Component {
    state = {
        title: '',
        content: [],
        relatedFile: [],
        url: [], 
        additionalNotes: '',
        address: '',
    }
   
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createProject(this.state);         
    };
    
    

handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(file.name).put(file);
    const uploader = document.getElementById('uploader');
    const onComplete = document.getElementById('onComplete');
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onComplete.innerHTML = 'Upload is ' + progress + '% done'
        uploader.value = progress;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: 
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: 
            console.log('Upload is running');
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
           this.setState(
               prevState => ({
                 relatedFile: [...prevState.relatedFile, relatedFile],
                 url: [...prevState.url, url]
               })
           )
        });
      }
    );
    }
    
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form className="white">
                    <h5 className="grey-text text-darken-3">Case create</h5>
                    <div className="input-field">
                        <label htmlFor="title">Category</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Case Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div onChange={this.handleUpload} className="file-field input-field">
                        <div className="btn z-depth-1 col s2">
                            Upload file
                        </div>
                            <input type="file" />
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Browse files" />
                        </div>
                    </div>
                    <progress value='0' max='100' id='uploader'>0%</progress>
                    <div id='onComplete'></div>
                    <div className="input-field row">
                        <button data-target="modal1" className="waves-effect waves-light btn modal-trigger" href="#modal1" onClick={this.handleSubmit}> Create </button>
                      {/*<Modal />*/}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)),
        
}}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);