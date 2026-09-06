import {
  Typography,
  Box
} from "@mui/material";

import type { Entry, HealthCheckRating } from "../../../../shared/types";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: Entry;
}

interface ColorHelper {
  rate: HealthCheckRating;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const colorHelper = (colorProp: ColorHelper): string => {
  if (colorProp.rate === 0) {
    return "green";
  } else if(colorProp.rate === 1) {
    return "yellow";
  } else if(colorProp.rate === 2){
    return "orange";
  } else {
    return "red";
  }
};

const EntryDetails = ({entry}: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box>
          <Typography>
            Health Check Rating: <FavoriteIcon style={{ color: `${colorHelper({rate: entry.healthCheckRating})}`}}/>
          </Typography>
          <Typography>
            Diagnosed BY: {entry.specialist}
          </Typography>
        </Box>
      );
    case "Hospital":
      return (
        <Box>
          <Typography>
            Discharge date: {entry.discharge.date}
          </Typography>

          <Typography>
            Discharge criteria: {entry.discharge.criteria}
          </Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box>
          <Typography>
            Employer: {entry.employerName}
          </Typography>

          {
            entry.sickLeave && (
              <Typography>
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            )
          }
        </Box>
      );
      default:
        return assertNever(entry);
  }
};


export default EntryDetails;