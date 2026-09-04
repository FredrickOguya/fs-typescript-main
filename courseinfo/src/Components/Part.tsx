import type { CoursePart } from "../App"
interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>  <i>{part.description}</i> <br />
          </div>
        );

      case "group":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4> Group project count: {part.groupProjectCount}
          </div>
        );
      case "background":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4> {part.description} <br />{part.backgroundMaterial} <br />
          </div> 
        );
      case "special":
        return (
          <div>
            <h4> {part.name} {part.exerciseCount}</h4> {part.description} <br /> required skills: {part.requirements.join(', ')}
          </div>
        )
    }
}

export default Part;