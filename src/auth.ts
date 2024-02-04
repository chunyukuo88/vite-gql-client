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

export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve(result)
            },
            onFailure: (err) => {
                reject(err)
            },
        });
    });
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

