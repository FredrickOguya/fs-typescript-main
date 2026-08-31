import express from "express"
import diagnosesRouter from './routes/diagnoses.ts'
import cors from 'cors'

const app = express()

const PORT = 3001

app.use(cors())
app.use('/api/diagnoses', diagnosesRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})