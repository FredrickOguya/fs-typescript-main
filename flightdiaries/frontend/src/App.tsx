import { useEffect, useState } from 'react'
import './App.css';
import {  type NonSensitiveDiaryEntry } from '../../types/types'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry []>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/diaries')
    .then(response => response.json())
    .then(data => setDiaries(data))
  })

  return (
    <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Visibility</th>
          <th>Weather</th>
        </tr>
        {
          diaries.map(entry=> 
            <tr>
              <td>{entry.date}</td> <td>{entry.visibility}</td> <td>{entry.weather}</td>
            </tr>
            ) 
        }
      </table>
    </div>
  )

  
}

export default App
