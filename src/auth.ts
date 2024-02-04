import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import { cognitoConfig } from './authConfig.ts';

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
});

export function signIn(username, password) {
    // Sign in implementation
}

export function signOut() {
    // Sign out implementation
}

export function getCurrentUser() {
    // Get current user implementation
}

export function getSession() {
    // Get session implementation
}

