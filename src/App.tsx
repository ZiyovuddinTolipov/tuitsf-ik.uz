import {useEffect} from 'react'
import { useRoutes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import NotFound from './components/NotFound'
// import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const MyComponent: React.FC = () => {

    const routes = useRoutes([
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      {path: '/dashboard/*',element: <Dashboard />
      },
      { path: '*', element: <NotFound /> }
    ]);
    useEffect(() => {
      AOS.init({
        duration: 1000
      });
      AOS.refresh();
    }, []);
    return (
      <main>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        {routes}
      </main>
    );
  };

  export default MyComponent;
