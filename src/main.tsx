import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import {Amplify} from 'aws-amplify';

import Root from './Root.tsx';
import Gigs from './pages/Gigs.tsx';
import LogIn from './pages/LogIn.tsx';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolClientId: '54f5a0ak2p6q99uje0s5arfgj2',
            userPoolId: 'us-east-2_NpmEssPrY',
            loginWith: { username: 'true' },
        },
    },
});

const router = createBrowserRouter([
    {path: '/', element: <Gigs />},
    {path: '/sign-in', element: <LogIn />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root>
        <RouterProvider router={router} />
    </Root>
);
