const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map((part) => { return <Part key={part.id} part={part} /> })}
  </>

const Total = ({ total }) => <b>total of {total} exercises</b>

const Course = ({ course }) => {

  const total = course.parts.reduce((acc, current) => {
    return acc + current.exercises
  }, 0)

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

export default Course
