import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';


const app = express()

app.get('/hello',(_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query

  const heightNumber = Number(height)
  const weightNumber = Number(weight)

  if (isNaN(heightNumber) || isNaN(weightNumber)){
    res.status(400).json({
      error: 'malformatted parameters'
    })
  }
  const bmi = calculateBmi(Number(height), Number(weight))

  res.send({
    "weight": weightNumber,
    "height": heightNumber,
    bmi
  })
  
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port 3003`)
})