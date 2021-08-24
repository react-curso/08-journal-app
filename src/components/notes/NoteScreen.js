/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const { formValue,  handleChange, reset } = useForm(note);

    const { title, body, url ,id} = formValue;

    const idRef = useRef( note.id );

    useEffect(() => {

        if(idRef.current !== note.id){
            reset(note);
            idRef.current = note.id;
        }

    }, [note, reset])

    useEffect(() => {

        dispatch( activeNote( id , {...formValue} ));

    }, [ formValue, id, dispatch ])


    const handleDeleteNote = () => {

        dispatch( startDelete( id ) );

    }

    return (
        <div className="note_main-content">

            <NoteAppBar />

            <div className="notes_content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="note_title-input"
                    name="title"
                    onChange={handleChange}
                    value={title}
                />
                <textarea
                    placeholder="Insert description"
                    className="note_textarea"
                    name="body"
                    onChange={handleChange}
                    value={body}
                ></textarea>

                {
                    (url) &&
                    <div className="note_image">
                        <img
                            src={`${note.url}`}
                            alt="image"
                            className=""
                        />
                    </div>
                }



            </div>
 
            <button 
                className="btn btn-danger"
                onClick={ handleDeleteNote }
            >
                Delete
            </button>

        </div>
    )
}
