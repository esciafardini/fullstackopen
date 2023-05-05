import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)


  const getNotesHook = () => {

    const responseHandler = (initialNotes) => {
      setNotes(initialNotes)
    }

    const promise = noteService.getAll()

    promise.then(responseHandler)
  }

  useEffect(getNotesHook, [])

  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote)) //this isn't modifying notes directly
        // RECALL: concat does not alter the original array :)
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        returnedNote && setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
