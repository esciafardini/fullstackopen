const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {
  return (
    <div>
      <p>{props.title} {props.exerciseCount}</p>
    </div>
  )
}

const Content = (props) => {
  const parts = props.courseInfo.map(info => <Part key={info.title} title={info.title} exerciseCount={info.exerciseCount} />)
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  const total = props.courseInfo.reduce((acc, currentVal) => acc + currentVal.exerciseCount, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const courseInfo =
    [{ "title": "Fundamentals of React", "exerciseCount": 10 },
     { "title": "Using props to pass data", "exerciseCount": 7 },
     { "title": "State of a component", "exerciseCount": 14 }]

  return (
    <div>
      <Header course={course} />
      <Content courseInfo={courseInfo} />
      <Total courseInfo={courseInfo} />
    </div>
  )
}

export default App;
