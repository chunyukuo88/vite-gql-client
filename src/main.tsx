import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import Root from './Root.tsx';
import Gigs from './pages/Gigs.tsx';
import LogIn from './pages/LogIn.tsx';

const router = createBrowserRouter([
    {path: '/', element: <Gigs />},
    {path: '/sign-in', element: <LogIn />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root>
        <RouterProvider router={router} />
    </Root>
);
