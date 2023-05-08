import axios from 'axios'
const baseUrl = 'http://localhost:3009/persons'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request
    .then((res) => res.data)
    .catch((err) => console.log(err.message))
}

const createNew = (newObj) => {
  const request = axios.post(baseUrl, newObj)

  return request
    .then((res) => res.data)
    .catch((err) => console.log(err.message))
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)

  return request
    .then((res) => res.data)
    .catch((err) => console.log(err))
}


const updatePhoneNumber = (newObj, success, error) => {
  const request = axios.put(`${baseUrl}/${newObj.id}`, newObj)

  return request
    .then((res) => {
      success()
      return res.data
    }
    )
    .catch((err) => {
      error()
      console.log(err)
    }
    )
}

export default { getAll, createNew, deletePerson, updatePhoneNumber }
