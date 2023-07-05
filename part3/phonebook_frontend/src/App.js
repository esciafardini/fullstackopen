import { useEffect, useState, React } from 'react'
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
        <button type="submit" onClick={submitClick}>Add Entry</button>
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
            <div key={person.name}>{person.name} @ {person.number}
              <button onClick={() => deleteClick(person.id)}>delete</button>
            </div>
          )
        })
      }
    </>
  )
}

const Notification = ({ notificationClass, message }) => {
  if (message !== null) {
    return (
      <div className={notificationClass}>{message}</div>
    )
  } else {
    return null
  }
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
  const [message, setMessage] = useState(null)
  const [notificationClass, setNotificiationClass] = useState(null)

  const notify = (className, message) => {
    setNotificiationClass(className)
    setMessage(message)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const resetFetchAndSet = () => {
    setNewName('')
    setNewNumber('')
    personService.getAll()
      .then((persons) =>
        persons && setPersons(persons))
  }

  const submitClick = (e) => {
    e.preventDefault()

    let existingPersonWithSameName = persons.find((person) => person.name === newName)

    if (existingPersonWithSameName && (window.confirm("This person already exists.  Do you want to update their phone number?"))) {

      personService.updatePhoneNumber({ ...existingPersonWithSameName, number: newNumber })
        .then(response => {
          if (typeof response === 'object') {
            notify('success-msg', `Updated ${newName}`)
            resetFetchAndSet()
          } else {
            notify('error-msg', response)
          }
        })

    } else {

      personService.createNew({ name: newName, number: newNumber })
        .then(response => {
          if (typeof response === 'object') {
            notify('success-msg', `Added ${newName}`)
            resetFetchAndSet()
          } else {
            notify('error-msg', response)
          }
        })
        .catch(e => {
          notify('error-msg', 'something went wrong')
        })
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
      <h1>Phonebook</h1>
      <Notification notificationClass={notificationClass} message={message} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} submitClick={submitClick} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} deleteClick={submitDelete} />
    </div>
  )
}

export default App
