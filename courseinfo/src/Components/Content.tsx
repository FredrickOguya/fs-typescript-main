import type { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  content: CoursePart[];
}

const Content = ({ content }: ContentProps) => {
  return (
    <div>
      { content.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content;