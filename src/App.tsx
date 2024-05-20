import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    let res = await fetch('http://127.0.0.1:8000/exercises');

    let json = await res.json();
    setExercises(json.data);
  }

  return (
    <>
      <p>hey man</p>
      <button onClick={getExercises}>go fetch</button>

      <div>
        <p>Exercises</p>
        <ul>
          {exercises.map((exercise: any, idx) => {
            return <li key={idx}>
              {exercise.name}
            </li>
          })}
        </ul>
      </div>

      <div>Pagination???</div>


    </>
  )
}

export default App
