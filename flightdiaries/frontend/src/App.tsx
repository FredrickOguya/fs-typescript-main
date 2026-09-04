import { useEffect, useState } from 'react'
import './App.css';
import {  Visibility,    Weather, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../../types/types'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry []>([])
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')



  useEffect(() => {
    fetch('http://localhost:3000/api/diaries')
    .then(response => response.json())
    .then(data => setDiaries(data))
  }, [])

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }

    try {
      const response = await fetch('http://localhost:3000/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diaryToAdd)
      })

      if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      const newDiary: NonSensitiveDiaryEntry = await response.json()

      setDiaries(diaries.concat(newDiary))

      setDate('')
      setWeather(Weather.Sunny)
      setVisibility(Visibility.Great)
      setComment('')
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div>
      {error &&  (
        <div style={{ color: 'red'}}>Error: {error}</div>
      )
      
    }
      <form onSubmit={createDiary}>
        date:<input type="text"
          value={date}
          onChange={({target}) => setDate(target.value)}
        />
        <br />
        <label>
          Visibility: 
          <select value={visibility}
          onChange={({target}) => setVisibility(target.value as Visibility)}>
        
        {
          Object.values(Visibility).map(visibilityOption => (
            <option key={visibilityOption} value={visibilityOption}>{visibilityOption}</option>
          )) 
        }
        </select>
        </label>
        <br />
        <label>Weather: 
          <select value={weather} 
          onChange={({target}) => setWeather(target.value as Weather)} >
            {
              Object.values(Weather).map(weatherOption => (
                <option key={weatherOption} value={weatherOption}>{weatherOption }</option>
              ))
            }</select>
        </label>
        
        <br />
        Comment: <input
         type="text" 
         value={comment}
         onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit' >Submit</button>
      </form>
      <table>
        <tr>
          <th>Date</th>
          <th>Visibility</th>
          <th>Weather</th>
        </tr>
        {
          diaries.map(entry=> 
            <tr key={entry.id}>
              <td>{entry.date}</td> <td>{entry.visibility}</td> <td>{entry.weather}</td>
            </tr>
            ) 
        }
      </table>
    </div>
  )

  
}

export default App
