import {
  createBrowserRouter,
} from 'react-router-dom';

// import App from './App';
import Exercises from './pages/Exercises/Exercises';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>hey</div>,
  },
  {
    path: '/exercises',
    element: <Exercises/>
  }
]);

export default router;