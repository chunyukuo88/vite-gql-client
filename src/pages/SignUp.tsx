import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';
import {useAuth} from "../globalState/auth/useAuth.ts";

export default function SignUpAndConfirmPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);
    const { signUpUser, handleSignUpConfirmation } = useAuth();

    const handleSignUpSubmission = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrMsg('Passwords do not match');
            return;
        }
        try {
            await signUpUser(email, password);
            setConfirmationNeeded(true);
        } catch (error) {
            setErrMsg('Failed to sign up');
            // Optionally, you can dispatch an action to update global state based on the sign-up result
            // dispatch(signUpFailed(error));
        }
    };

    const handleConfirmationSubmission = async (event) => {
        event.preventDefault();
        try {
            const { isSignUpComplete, nextStep } = await handleSignUpConfirmation({
                username: email,
                confirmationCode
            });
            if (isSignUpComplete) {
                console.log('sign up done, homie');
            }
        } catch (error) {
            console.log('error confirming sign up', error);
            setErrMsg('Failed to confirm sign up');
        }
    };

    const handleEmailInput = (event) => setEmail(event.target.value);
    const handlePasswordInput = (event) => setPassword(event.target.value);
    const handleConfirmPasswordInput = (event) => setConfirmPassword(event.target.value);
    const handleConfirmationCodeInput = (event) => setConfirmationCode(event.target.value);

    return (
        <div className='card' id='sign-up-card'>
            <header className='card-header-title is-size-2'>Sign Up</header>
            {!confirmationNeeded ? (
                <form className='control' onSubmit={handleSignUpSubmission}>
                    <fieldset>
                        <input
                            className='input'
                            id='email'
                            type='email'
                            value={email}
                            onChange={handleEmailInput}
                            placeholder='Email'
                            autoComplete='off'
                            required
                        />
                        <input
                            className='input'
                            id='password'
                            type='password'
                            value={password}
                            onChange={handlePasswordInput}
                            placeholder='Password'
                            required
                        />
                        <input
                            className='input'
                            id='confirm-password'
                            type='password'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordInput}
                            placeholder='Confirm Password'
                            required
                        />
                        <button className='button' title='signup button'>Sign Up</button>
                    </fieldset>
                    <p>{errMsg}</p>
                </form>
            ) : (
                <form className='control' onSubmit={handleConfirmationSubmission}>
                    <fieldset>
                        <input
                            className='input'
                            id='confirmation-code'
                            type='text'
                            value={confirmationCode}
                            onChange={handleConfirmationCodeInput}
                            placeholder='Confirmation Code'
                            autoComplete='off'
                            required
                        />
                        <button className='button' title='confirm button'>Confirm</button>
                    </fieldset>
                    <p>{errMsg}</p>
                </form>
            )}
            <div style={{ margin: '1rem' }}>
                <Link to={routes.LOGIN}>Already have an account? Sign in</Link>
            </div>
        </div>
    );
}