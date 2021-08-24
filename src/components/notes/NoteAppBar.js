import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

import moment from 'moment';

export const NoteAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSaveNote = () => {

        dispatch(startSaveNote({ ...active }))

    }

    const handlePicture = () => {

        document.querySelector('#file').click();

    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if( file ){
            dispatch( startUploading( file ) );
        }

    }


    return (
        <div className="note_appbar">

            <span> {moment().format('dddd, MMMM Do YYYY')}</span>

            <input 
                id="file"
                type="file" 
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn note"
                    onClick={handlePicture}
                >
                    Picture
                </button>
            </div>

            <div>
                <button
                    className="btn note"
                    onClick={handleSaveNote}
                >
                    Save
                </button>
            </div>

        </div>
    )
}
