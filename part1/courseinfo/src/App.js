const Header = ({ title }) => {
  return (<h1>{title}</h1>)
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  const partComponents = parts.map(({ name, exercises }) => <Part key={name} name={name} exercises={exercises} />)
  return (
    <div>
      {partComponents}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, { exercises }) => acc + exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const { name, parts } = course

  return (
    <div>
      <Header title={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;
