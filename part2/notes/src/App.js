import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        <ul>
          {notes
            .filter(note => showAll || note.important)
            .map(note => <Note key={note.id} note={note} />)
          }
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
