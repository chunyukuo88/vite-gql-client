import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

import Root from './Root.tsx';
import Gigs from './pages/Gigs.tsx';
import SignInPage from './pages/SignInPage.tsx';

import { routes } from './common/routes.ts';
import ResetPasswordPage from './pages/ResetPassword.tsx';
import SignUpPage from './pages/SignUp.tsx';
import SignUpAndConfirmPage from "./pages/ConfirmSignup.tsx";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-east-2_NpmEssPrY',
            userPoolClientId: '54f5a0ak2p6q99uje0s5arfgj2',
            signUpVerificationMethod: 'code',
            loginWith: { email: true },
        },
    },
});

const router = createBrowserRouter([
    {path: routes.MAIN_PAGE, element: <Gigs />},
    {path: routes.SIGN_IN_PAGE, element: <SignInPage />},
    {path: routes.SIGN_UP_PAGE, element: <SignUpPage />},
    {path: routes.RESET_PW, element: <ResetPasswordPage />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root>
        <main id='App'>
            <RouterProvider router={router}/>
        </main>
    </Root>
);
