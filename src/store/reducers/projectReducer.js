import { CREATE_PROJECT, CREATE_PROJECT_ERROR, FIND_INFO, } from '../../components/action-types';


const initState = {}

const projectReducer = (state = initState, action) => {
   switch (action.type) {
     case CREATE_PROJECT:
       return state;
     case CREATE_PROJECT_ERROR :
       console.log('create project error');
       return state; 
       case FIND_INFO:
         return {
           ...state,
          found: action.found,
         }
    default:   
       return state; 
   }
};

export default projectReducer;