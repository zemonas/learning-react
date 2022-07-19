import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css'

export default function App() {
    const [notes, setNotes] = React.useState(
        ()=>JSON.parse(localStorage.getItem("notes"))||[]
        )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
            // create a new array of notes
            const newNotes = [...oldNotes]
            // find the note with the current note id
            const noteToUpdate = newNotes.find(note => note.id === currentNoteId)
            // update the note
            noteToUpdate.body = text
            // push it in front of the array
            return [noteToUpdate, ...newNotes.filter(note => note.id !== currentNoteId)]
        })
    }
    // this doesnot rearrange the array, it just changes the value of the array, there must be a way to do this without using map
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { body: text,...oldNote}
    //         : oldNote
    //     }))
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    function deleteNote(event,noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
