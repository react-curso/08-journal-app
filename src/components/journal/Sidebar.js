import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const { name, photo } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    // Active logout in firebase and clean redux state
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAddNote = () => {
        dispatch( startNewNote() ); // create a New Note 
    }

    return (
        <aside className="journal_sidebar">

            <div className="journal_sidebar-navbar">

                <h3 className="mt-5">

                    {
                        (photo)
                            ? <img
                                alt="phpto"
                                src={`${photo}`}
                                className="photo-user"
                            />
                            : <i className="fa fa-moon"></i>
                    }


                    <span> {name}</span>
                </h3>

                <Link
                    className="btn mt-5"
                    to="/auth/login"
                    onClick={handleLogout}
                >
                    Logout
                </Link>

            </div>

            <div
                className="journal_new_entry"
                onClick={ handleAddNote }
            >

                <i className="fa fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>

            </div>

            <JournalEntries />

        </aside>
    )
}
