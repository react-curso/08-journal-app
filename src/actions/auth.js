import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';

// Login Submit normal
export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch(finishLoading())
            })
            .catch(e => {
                dispatch(finishLoading())
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e.message}`
                })
            })
    }
}

// Register with type Normal
export const startRegisterEmail = (email, password, name) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name })

                dispatch(
                    login(user.uid, user.displayName)
                )

            }).catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e.message}`
                })
            })
    }
}

// Autenticacion con Google [ se llama en el boton de LOGIN ]
export const startGoogleLogin = () => {

    return async ( dispatch ) => {

        //  Action From Firebase-config.js
        const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)

        await dispatch(login(user.uid, user.displayName, user.photoURL))

    }
}


// auth Reducers
export const login = (uid, displayName, photo) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName,
            photo
        }
    }
}


// Logout in firebase
export const startLogout = () => {
    return async (dispatch) => {

        await firebase.auth().signOut();

        dispatch( logout() );

        dispatch( cleaningNoteLogout() );

    }
}

// Clean state on Redux[auth]
const logout = () => {
    return {
        type: types.logout
    }
}

const cleaningNoteLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}