import { useState } from 'react'

const getArrayIdx = (current) => {
  let randomNum = Math.floor(Math.random() * 8)
  if (randomNum === current)
    return getArrayIdx(randomNum)
  else
    return randomNum
}

const getIdxOfMax = (obj) => {
  let maxVal = Math.max(...Object.values(obj))
  let keyForMaxVal = Object.keys(obj).find(key => obj[key] === maxVal)
  return keyForMaxVal
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const VoteDisplay = ({ voteCount }) => {
  if (voteCount === 1)
    return (
      <div>has {voteCount} vote</div>
    )
  else
    return (
      <div>has {voteCount} votes</div>
    )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [max, setMax] = useState(0)

  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })

  const handleGenerate = () => {
    const currentIdx = selected
    const newIdx = getArrayIdx(currentIdx)
    setSelected(newIdx)
  }

  const handleVote = () => {
    const newVal = points[selected] + 1
    const idx = selected;

    const newPoints = { ...points, [idx]: newVal }

    const newMax = (getIdxOfMax(newPoints))

    setMax(newMax)
    setPoints(newPoints)
  }

  return (
    <>
      <Header title="Anecdote of the day" />
      <div>
        {anecdotes[selected]}
      </div>
      <Button handleClick={handleGenerate} text="next anecdote" />
      <Button handleClick={handleVote} text="vote" />
      <VoteDisplay voteCount={points[selected]} />


      <Header title="Anecdote with most votes" />
      <div>
        {anecdotes[max]}
      </div>
      <div>has {points[max]} votes</div>
    </>
  )
}

export default App
