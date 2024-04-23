import { useRoutes } from 'react-router-dom';
import Users from './components/Users'
import NotFound from './components/NotFound'
import { Toaster } from "react-hot-toast"

const MyComponent: React.FC = () => {

    const routes = useRoutes([
      { path: '/', element: <Users /> },
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
