import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../globalState';
import { useAuth } from '../globalState/auth/useAuth.ts';
import './LoginPage.css';

export default function LogIn () {
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
            alert('Success! You are signed in.');
        } catch (e) {
            handleError(e)
            alert(`Oh farts it didn't work: ${errMsg}`);
        }
    };

    const handleUserInput = (event) => setUserName(event.target.value);
    const handlePwdInput = (event) => setPwd(event.target.value);

    return (
        <div id='login-card-wrapper'>
            <div id='login-card'>
                <form className='logout-out-form' onSubmit={handleSubmit}>
                    <fieldset className='inputs-wrapper'>
                        <div className='username-input'>
                            <input
                                type='text'
                                data-testid='username-input'
                                id='username'
                                ref={userRef}
                                value={userName}
                                onChange={handleUserInput}
                                placeholder={'Email'}
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className='password-input'>
                            <input
                                type='password'
                                data-testid='password-input'
                                id='password'
                                onChange={handlePwdInput}
                                placeholder={'Your password'}
                                value={pwd}
                                required
                            />
                        </div>
                    </fieldset>
                    <button className='login-button' title='login button'>Submit</button>
                </form>
            </div>
        </div>
    );
};
