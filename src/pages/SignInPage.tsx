import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../globalState';
import { useAuth } from '../globalState/auth/useAuth.ts';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';
import './SignInPage.css';

export default function SignInPage () {
    const dispatch = useDispatch();
    const { signIntoApp } = useAuth();
    const userRef = useRef();
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [userName, pwd]);

    const handleError = (error) => {
        if (!error?.originalStatus) setErrMsg('No server response');
        else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
        else setErrMsg('LoginPage failed');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { isSignedIn, nextStep } = await signIntoApp(userName, pwd);
            // const { username, signInUserSession } = await signIntoApp(userName, pwd);
            // const payload = {
            //     username,
            //     token: signInUserSession.accessToken.jwtToken,
            // }
            // dispatch(setCredentials(payload));
            console.log('isSignedIn')
            console.log(isSignedIn)
            console.log('nextStep')
            console.log(nextStep)
            alert('Success! You are signed in.');
        } catch (e) {
            handleError(e)
        }
    };

    const handleUserInput = (event) => setUserName(event.target.value);
    const handlePwdInput = (event) => setPwd(event.target.value);

    return (
        <>
            <form className='control' onSubmit={handleSubmit}>
                <fieldset>
                    <input
                        className='input'
                        id='username'
                        type='text'
                        ref={userRef}
                        value={userName}
                        onChange={handleUserInput}
                        placeholder={'Email'}
                        autoComplete='off'
                        required
                    />
                    <input
                        className='input'
                        id='password'
                        type='password'
                        onChange={handlePwdInput}
                        placeholder={'Your password'}
                        value={pwd}
                        required
                    />
                    <button className='button' title='login button'>Submit</button>
                </fieldset>
                <p>{errMsg}</p>
            </form>
            <Link to={routes.MAIN_PAGE}>Back to main</Link>
        </>
    );
}
