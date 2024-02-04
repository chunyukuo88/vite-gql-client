import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import Root from './Root.tsx';
import Gigs from './pages/Gigs.tsx';
import SignIn from './SignIn.tsx';

const router = createBrowserRouter([
    {path: '/', element: <Gigs />},
    {path: '/sign-in', element: <SignIn />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root>
        <RouterProvider router={router} />
    </Root>
);
