import { types } from "../types/types";

const initialState = {
    uid: '',
    name: '',
    photo: ''
}

export const authReducer = (state = initialState, action) =>{

    switch (action.type) {
        case types.login:
            
           return{
               uid: action.payload.uid,
               name: action.payload.displayName,
               photo: action.payload.photo
           }
    
        case types.logout:
            
            return{}
    
        default:
            return state;
    }

}
