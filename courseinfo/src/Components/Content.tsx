interface ContentProps {
  content: {
    name: string,
    exerciseCount: number
  }[];
}

const Content = (props: ContentProps) => {
  return props.content.map(c => 
    <p>
      {c.name} {c.exerciseCount}
    </p>
  )
}

export default Content;