
import 'firebase/storage';


 import { CREATE_PROJECT, CREATE_PROJECT_ERROR, FIND_INFO, ADD_INFO } from '../../components/action-types';

export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const projectId = Math.floor(Math.random() * 100000);
        
        
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            projectId: projectId,
        }).then(() => {
            dispatch({type: CREATE_PROJECT, project });
        }).catch(err => {
            dispatch({type: CREATE_PROJECT_ERROR, err});
        });
        
        
    }
};

export const addInfo = (project, projectId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirebase().firestore();
        project && firestore.collection('projects').doc(projectId).set({
            ...project,
            relatedFile: project.relatedFile,
            url: project.url,
            updatedAt: new Date(),
        })
        .then(() => {
            dispatch({type: ADD_INFO, project }); 
        })
    }
}



export const findInfo = (finder) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirebase().firestore();
        const projectsRef = firestore.collection("projects");
        const found = [];
        projectsRef
        .where("address", "==", finder)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            found.push(doc.data()) 
            })
        })
        .then(() => {
            dispatch({type: FIND_INFO, found })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
})
    }};



