import {
  createBrowserRouter,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';
import Workouts from './pages/Workouts/Workouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/exercises',
    element: <Exercises/>
  },
  {
    path: '/workouts',
    element: <Workouts/>
  }
]);

export default router;