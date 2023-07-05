import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request
    .then((res) => res.data)
    .catch((err) => console.log(err.message))
}

const createNew = (newObj) => {
  const request = axios.post(baseUrl, newObj)

  return request
    .then((res) => {
      return res.data
    }
    )
    .catch((err) => {
      return err.response.data.error
    }
    )
}

const deletePerson = (id) => {
  console.log(`${baseUrl}/${id}`)
  const request = axios.delete(`${baseUrl}/${id}`)

  return request
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => console.log(err))
}

const updatePhoneNumber = (newObj) => {
  console.log(newObj)
  const request = axios.put(`${baseUrl}/${newObj.id}`, newObj)

  return request
    .then((res) => {
      console.log('success in persons.js ns??')
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return err.response.data.error
    })
}
const exportedObject = { getAll, createNew, deletePerson, updatePhoneNumber };

export default exportedObject;
