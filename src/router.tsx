import {
  createBrowserRouter,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/exercises',
    element: <Exercises/>
  }
]);

export default router;