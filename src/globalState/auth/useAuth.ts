import { signIn } from 'aws-amplify/auth';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice.js';
import { errorLogger, logger } from '../../common/utils';

export function useAuth(){
  const user = useSelector(selectCurrentUser);

  const signIntoApp = async (username, password) => {
    const { isSignedIn, nextStep } = await signIn({username, password});
    logger('isSignedIn:');
    logger(isSignedIn);
    logger('nextStep:');
    logger(nextStep);
    return { isSignedIn, nextStep };
    // const currentUser = await currentAuthenticatedUser();
    // return currentUser;
  };

  // const changePassword = async (username, oldPassword, newPassword) => {
  //   Auth.changePassword(user, oldPassword, newPassword)
  //     .then(data => logger(data))
  //     .catch(e => errorLogger(e));
  // };

  // const signOut = async () => {
  //   const promise = await Auth.signOut();
  //   return promise;
  // };

  return {
    // changePassword,
    // signOut,
    signIntoApp,
    user,
  };
}
