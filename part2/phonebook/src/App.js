import { useState } from 'react'

const Filter = ({ nameFilter, setNameFilter }) => {
  return (
    <div>
      filter name: <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, submitClick }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={submitClick}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, nameFilter }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().match(nameFilter.toLowerCase()))
        .map((person) => <div key={person.id}>{person.name} @ {person.phoneNumber}</div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phoneNumber: '410-555-4343',
      id: 1
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const submitClick = (e) => {
    e.preventDefault()

    let duplicate = persons.find((person) => person.name === newName) || persons.find((person) => person.phoneNumber === newNumber)

    duplicate ? alert(`${newName} or ${newNumber} already exists.`) : setPersons(persons.concat([{ name: newName, phoneNumber: newNumber, id: persons.length + 1 }]))

    !duplicate && setNewName('')
    !duplicate && setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} submitClick={submitClick} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App
