import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice.js';
import { routes } from 'src/routes';

export function RequireAuth(props){
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (token)
    ? <>{props.children}</>
    : <Navigate to={routes.index} state={{ from: location }} replace />;
}
