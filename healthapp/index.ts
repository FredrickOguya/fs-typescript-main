import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';


const app = express()
app.use(express.json())

app.get('/hello',(_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query

  const heightNumber = Number(height)
  const weightNumber = Number(weight)

  if (isNaN(heightNumber) || isNaN(weightNumber)){
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }
  const bmi = calculateBmi(Number(height), Number(weight))

  return res.send({
    "weight": weightNumber,
    "height": heightNumber,
    bmi
  })
  
})

app.post('/exercises', (req,res) => {
  const {daily_exercises, target} = req.body as {
    daily_exercises: unknown,
    target: unknown
  };

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    })
  }

  if (
    !Array.isArray(daily_exercises) || 
    daily_exercises.some(e => isNaN(Number(e))) ||
    isNaN(Number(target))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }
  
  const exercisesSummary = calculateExercises(daily_exercises.map(e => Number(e)), Number(target))

  return res.send(
    exercisesSummary
  )
})
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})