interface averageDailyExerciseTime {
  periodLength: number;
  trainingDays: number;
  sucess: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHouts: number[], targetValue: number): averageDailyExerciseTime => {
  const periodLength = dailyExerciseHouts.length

  let trainingDays = 0
  for(let i= 0; i<=dailyExerciseHouts.length - 1; i++){
    if(dailyExerciseHouts[i] > 0){
      trainingDays += 1;
    }
  }
  
  const sucess = trainingDays < targetValue ? false : true

  let totalHours = 0
  dailyExerciseHouts.map(hour => totalHours += hour)
  const average = totalHours / periodLength

  const ratingNumber = average / targetValue
  let rating
  let ratingDescription

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
    sucess: sucess,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
    
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))