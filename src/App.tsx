import { useRoutes } from 'react-router-dom';
// import Users from './components/Users'
import NotFound from './components/NotFound'
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import Login from './pages/Login';


const MyComponent: React.FC = () => {

    const routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> }
    ]);
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
