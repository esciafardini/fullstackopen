import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, nameFilter, deleteClick }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().match(nameFilter.toLowerCase()))
        .map((person) => {
          return (
            <div key={person.id}>{person.name} @ {person.number}
              <button onClick={() => deleteClick(person.id)}>delete</button>
            </div>
          )
        })
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll()
      .then((persons) =>
        persons && setPersons(persons)
      )
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const submitClick = (e) => {
    e.preventDefault()

    let existingPersonWithSameName = persons.find((person) => person.name === newName)

    if (existingPersonWithSameName && (window.confirm("This person already exists.  Do you want to update their phone number?"))) {

      personService.updatePhoneNumber({ ...existingPersonWithSameName, number: newNumber })

      setPersons(persons.filter((obj) => obj.id !== existingPersonWithSameName.id)
        .concat([{ name: newName, number: newNumber, id: existingPersonWithSameName.id }]))

    } else {

      personService.createNew({ name: newName, number: newNumber, id: persons.length + 1 })
      setPersons(persons.concat([{ name: newName, number: newNumber, id: persons.length + 1 }]))

    }
  }

  const submitDelete = (id) => {
    if (window.confirm("Do you really want to delete this? It will never come back.")) {
      personService.deletePerson(id)
      setPersons(persons.filter((obj) => obj.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} submitClick={submitClick} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} deleteClick={submitDelete} />
    </div>
  )
}

export default App
