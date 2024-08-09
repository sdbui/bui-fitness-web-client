import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Workouts() {
  return (
    <Box 
      flexDirection='column'
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - var(--app-bar-height))"
      display="flex">
      <FontAwesomeIcon 
        size="10x"
        icon={faPersonDigging}></FontAwesomeIcon>
      <Typography my={10} variant="h1">WORKOUTS COMING!!!</Typography>
    </Box>
  );
}