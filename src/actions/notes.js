import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNote';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth; // Id user for create New Note

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(docRef.id, newNote))

        dispatch( addNewNote( docRef.id , newNote ) )

    }
}

export const addNewNote = ( id , note) => {
    return{

        type: types.notesAddNew,
        payload: {
            id, 
            ...note
        }

    }
}

export const activeNote = (id, note) => {

    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
};

export const startLoadingNotes = (uid) => {

    return async (dispatch) => {

        const notes = await loadNotes(uid); // Get Notes For User ID

        dispatch(setNotes(notes));
    }

};


export const setNotes = (notes) => {

    return {
        type: types.notesLoad,
        payload: notes
    }

}


// Save Note Screen
export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth; // Id user for create New Note

        const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        if (!note.url) {
            delete noteToFirestore.url;
        }

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, note));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const refreshNote = (id, note) => {

    return {
        type: types.notesUpdate,
        payload: {
            id,
            note
        }
    }

}


export const startUploading = (file) => {

    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Uploading...',
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const resp = await fileUpload(file);
        activeNote.url = resp;

        dispatch(startSaveNote(activeNote))

        Swal.close();

    }

}


export const startDelete = (id) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your note has been delete',
            showConfirmButton: false,
            timer: 1500
          })

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));


    }

}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}