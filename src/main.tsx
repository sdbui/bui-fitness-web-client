import React from 'react'
import ReactDOM from 'react-dom/client'
import AppBar from './components/AppBar';

import './index.css';
import './variables.css';

import router from './router.tsx';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{width: '100vw','max-width': '100%', height: 'calc(100vh - var(--app-bar-height))','margin-top': 'var(--app-bar-height)'}}>
        <RouterProvider router={router}></RouterProvider>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
