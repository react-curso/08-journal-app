import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NotSelected } from './NotSelected'
// import { NotSelected } from './NotSelected'
import { Sidebar } from './Sidebar'


export const JournalScreen = () => {

    // Activated when creating a new note
    const { active } = useSelector(state => state.notes); 

    return (
        <div className="journal_main-content">
            
            <Sidebar />

            <main >
                {
                    (active !== null)
                    ? <NoteScreen />
                    : <NotSelected /> 
                }
            </main>
        </div>
    )
}
