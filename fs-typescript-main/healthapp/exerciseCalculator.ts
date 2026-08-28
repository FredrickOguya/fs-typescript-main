interface averageDailyExerciseTime {
  periodLength: number;
  trainingDays: number;
  sucess: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface arguments  {
  averageDailyExerciseTime: number[];
  targetValue: number
}

const parseArguments = (args: string[]): arguments => {
  if (args.length < 4) throw new Error('Not enough arguments')
  
  const parsedArguments = process.argv.slice(2)
  const target = Number(Number(parsedArguments[0]))

  const dailyAverages = parsedArguments.slice(1).map(Number);

  return {
    averageDailyExerciseTime: dailyAverages,
    targetValue: target
  }

}

const calculateExercises = (dailyExerciseHouts: number[], targetValue: number): averageDailyExerciseTime => {
  const periodLength = dailyExerciseHouts.length

  let trainingDays = 0
  for(let i= 0; i<=dailyExerciseHouts.length - 1; i++){
    if(dailyExerciseHouts[i] > 0){
      trainingDays += 1;
    }
  }
  

  let totalHours = 0
  dailyExerciseHouts.map(hour => totalHours += hour)
  const average = totalHours / periodLength

  const success = average >= targetValue

  const ratingNumber = average / targetValue
  let rating: number
  let ratingDescription: string

  if ( ratingNumber <= 0.5) {
    rating = 1
    ratingDescription = 'Put more effort'
  } else if (ratingNumber > 0.5 && ratingNumber < 1){
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'Good work and Effort'
  }

  const target = targetValue



  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    sucess: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
    
  }
}

try {
  const {averageDailyExerciseTime, targetValue} = parseArguments(process.argv)

  console.log(calculateExercises(averageDailyExerciseTime, targetValue))
} catch (error: unknown) {
  let errorMessage = 'Something bad happende.'
  if( error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

