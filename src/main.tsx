import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

import Root from './Root.tsx';
import Gigs from './pages/Gigs.tsx';
import SignInPage from './pages/SignInPage.tsx';

import { routes } from './common/routes.ts';
import ChangePasswordPage from './pages/ChangePassword.tsx';

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
    {path: routes.MAIN_PAGE, element: <Gigs />},
    {path: routes.SIGN_IN_PAGE, element: <SignInPage />},
    {path: routes.CHANGE_PW, element: <ChangePasswordPage />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root>
        <main id='App'>
            <RouterProvider router={router}/>
        </main>
    </Root>
);
