interface TotalExercisesProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Total = (props: TotalExercisesProps) => {
  return `Number of exercises ${props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}`
}

export default Total;