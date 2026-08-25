interface bmiValues {
  height: number;
  weight: number
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
    
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }


}


export const calculateBmi = (height: number, weight: number): string => {

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

if (process.argv[1] === import.meta.filename)
try {
  const {height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  if(error instanceof Error){
    errorMessage += error.message
  }
  console.log(errorMessage)
}