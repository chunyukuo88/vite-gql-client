import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../globalState';
import { useAuth } from '../globalState/auth/useAuth.ts';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';
import './SignInPage.css';
import { errorLogger } from '../common/utils.ts';

export default function SignInPage() {
    return (
      <p>hello</p>
    );
}
