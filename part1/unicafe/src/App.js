import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {

  const avg = (g, b, n) => {
    let goodScore = g * 1
    let badScore = b * -1
    let total = g + b + n
    return ((goodScore + badScore) / total)
  }

  const percentagePositive = (g, b, n) => {
    let total = g + b + n
    return ((g / total) * 100).toString() + "%"
  }

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given </div>
      </div>)
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={bad + good + neutral} />
            <StatisticLine text="average" value={avg(good, bad, neutral)} />
            <StatisticLine text="positive" value={percentagePositive(good, bad, neutral)} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />


      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
