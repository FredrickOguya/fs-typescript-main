interface TotalExercisesProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Total = (props: TotalExercisesProps) => {
  return (
    <div>
      <br />
      Number of exercises {props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
    </div>
   )
}

export default Total;