import {
  signIn,
  signUp,
  confirmSignUp,
  updatePassword,
} from 'aws-amplify/auth';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice.js';
import { errorLogger, logger } from '../../common/utils';

export function useAuth(){
  const user = useSelector(selectCurrentUser);

  const signUpUser = async (email, password) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true
        }
      });

      console.log('userId', userId);
      console.log('isSignUpComplete', isSignUpComplete);
      console.dir(nextStep);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  async function handleSignUpConfirmation({username, confirmationCode}) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log('isSignUpComplete');
      console.dir(isSignUpComplete);
      console.log('nextStep');
      console.dir(nextStep);
      return { isSignUpComplete, nextStep };
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  const signIntoApp = async (username, password) => {
    const { isSignedIn, nextStep } = await signIn({username, password});
    console.dir(isSignedIn);
    console.dir(nextStep);
    return { isSignedIn, nextStep };
  };

  async function changePassword({ oldPassword, newPassword }) {
    try {
      await updatePassword({ oldPassword, newPassword });
      logger('Password changed.');
    } catch (err) {
      errorLogger(err);
    }
  }

  return {
    changePassword,
    handleSignUpConfirmation,
    signUpUser,
    signIntoApp,
    user,
  };
}
