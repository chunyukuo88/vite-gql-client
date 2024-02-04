import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice.js';
import { errorLogger, logger } from '../../common/utils';

export function useAuth(){
  const user = useSelector(selectCurrentUser);

  const signIn = async (username, password) => {
    await Auth.signIn(username, password);
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser;
  };

  const changePassword = async (username, oldPassword, newPassword) => {
    Auth.changePassword(user, oldPassword, newPassword)
      .then(data => logger(data))
      .catch(e => errorLogger(e));
  };

  const signOut = async () => {
    const promise = await Auth.signOut();
    return promise;
  };

  return {
    changePassword,
    signIn,
    signOut,
    user,
  };
}
