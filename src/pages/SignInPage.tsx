import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../globalState';
import { useAuth } from '../globalState/auth/useAuth.ts';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';
import './SignInPage.css';
import { errorLogger } from '../common/utils.ts';

export default function SignInPage () {
    const dispatch = useDispatch();
    const { signIntoApp, changePassword } = useAuth();
    const userRef = useRef();
    const [userName, setUserName] = useState('');
    const [currentPwd, setCurrentPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [changePwIsOpen, setChangePwIsOpen] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [userName, currentPwd]);

    const handleError = (error) => {
        if (!error?.originalStatus) setErrMsg('No server response');
        else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
        else setErrMsg('LoginPage failed');
    };

    const handleSignInSubmission = async (event) => {
        event.preventDefault();
        try {
            const { isSignedIn, nextStep } = await signIntoApp(userName, currentPwd);
            if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                return setChangePwIsOpen(true);
            }
        } catch (e) {
            handleError(e)
        }
    };

    const handleUserInput = (event) => setUserName(event.target.value);
    const handlePwdInput = (event) => setCurrentPwd(event.target.value);

    const [newPwd, setNewPwdInput] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');
    const [newPwdSuccessful, setNewPwdSuccessful] = useState(false);
    const handleCurrentPwdInput = (event) => setCurrentPwd(event.target.value);
    const handleNewPwdInput = (event) => setNewPwdInput(event.target.value);
    const handleConfirmNewPwdInput = (event) => setConfirmNewPwd(event.target.value);

    const handleNewPwSubmission = async () => {
        const args = {
            oldPassword: currentPwd,
            newPassword: newPwd,
        };
        try {
            await changePassword(args);
            setNewPwdSuccessful(true);
        } catch (err) {
            errorLogger(err);
        }
    };

    const ChangePasswordInputs = () => {
        return (
            <div className='card' id='change-password-card'>
                <header className='card-header-title is-size-2'>
                    Reset Password
                </header>
                <form className='control' onSubmit={handleSignInSubmission}>
                    <fieldset>
                        <input
                            className='input'
                            id='current-password'
                            type='password'
                            onChange={handleCurrentPwdInput}
                            placeholder={'Current Password'}
                            value={currentPwd}
                            required
                        />
                        <input
                            className='input'
                            id='new-password'
                            type='password'
                            onChange={handleNewPwdInput}
                            placeholder={'New Password'}
                            value={newPwd}
                            required
                        />
                        <input
                            className='input'
                            id='confirm-new-password'
                            type='password'
                            onChange={handleConfirmNewPwdInput}
                            placeholder={'Confirm New Password'}
                            value={confirmNewPwd}
                            required
                        />
                        <button
                            className='button'
                            title='submit new password button'
                            onClick={handleNewPwSubmission}
                        >Change Password</button>
                    </fieldset>
                    <p>{errMsg}</p>
                </form>
                {newPwdSuccessful ? <div>Password has been successfully reset.</div> : null}
            </div>
        );
    };

    return (
        <div className='card' id='sign-in-card'>
            <header className='card-header-title is-size-2'>
                Sign In
            </header>
            <form className='control' onSubmit={handleSignInSubmission}>
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
                        value={currentPwd}
                        required
                    />
                    <button className='button' title='login button'>Submit</button>
                </fieldset>
                <p>{errMsg}</p>
                <div id='other-password-operations'>
                    <Link to={routes.FORGOT_PW}>Forgot Password?</Link>
                    <Link to={routes.RESET_PW}>Reset Password</Link>
                </div>
            </form>
            {changePwIsOpen ? <ChangePasswordInputs/> : null}
            <div style={{ margin: '1rem' }}>
                <Link to={routes.MAIN_PAGE}>Back to main</Link>
            </div>
        </div>
    );
}
