import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';

export default function ResetPasswordPage() {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwdInput] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleCurrentPwdInput = (e) => setCurrentPwd(e.target.value);
    const handleNewPwdInput = (e) => setNewPwdInput(e.target.value);
    const handleConfirmNewPwdInput = (e) => setConfirmNewPwd(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //
    };

    return (
        <div className='card' id='change-password-card'>
            <header className='card-header-title is-size-2'>
                Change Password
            </header>
            <form className='control' onSubmit={handleSubmit}>
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
                    <button className='button' title='change password button'>Change Password</button>
                </fieldset>
                <p>{errMsg}</p>
            </form>
            <div style={{ margin: '1rem' }}>
                <Link to={routes.MAIN_PAGE}>Back to main</Link>
            </div>
        </div>
    );
}