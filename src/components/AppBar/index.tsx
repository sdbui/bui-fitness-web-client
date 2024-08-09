import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function AppBar() {
  return (
    <Box
      alignItems='center'
      display="flex"
      position="fixed"
      width='100vw'
      height='var(--app-bar-height)'
      px='25px'
      sx={{top: '0', background: 'black', 'z-index': 100}}>
      <Box component='nav' display="flex">
        <Link href="/" mr="10px">Home</Link>
        <Link href="/exercises" mr="10px">Exercises</Link>
        <Link mr="10px" disabled component="button" onClick={()=> {
          // href=/workouts
        }}>Workouts</Link>
      </Box>
      <Box
        display="flex"
        ml='auto'
        justifySelf='end'
        gap={2}>
          <Avatar sx={{width: 36, height: 36}}>S</Avatar> {/* if signed in show avatar */}
          <Button variant="contained">Sign In</Button>
      </Box>
    </Box>
  );
}