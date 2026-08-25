const calculateBmi = (height: number, weight: number): string => {

  if (height < 0 || weight < 0 ){
    throw new Error('Height and weight must be greater than 0')
  }
  const bmi: number = (weight * 10000) / (height * height)
  if (bmi < 18.5) {
    return 'underweight'
  } else if (bmi >= 18.5 && bmi <= 24.9 ){
    return 'Normal range'
  } else if ( bmi >= 25 && bmi <= 29.9){
    return 'overweight'
  } else{
    return 'obese'
  }

}

try {
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  if(error instanceof Error){
    errorMessage += error.message
  }
  console.log(errorMessage)
}