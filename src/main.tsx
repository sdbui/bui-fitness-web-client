import React from 'react'
import ReactDOM from 'react-dom/client'
import AppBar from './components/AppBar';
import './index.css'
import router from './router.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppBar />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
