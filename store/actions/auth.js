import { AsyncStorage } from 'react-native';
import PrivKeys from '../../privConstants/constants';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId) => {
    return { type: AUTHENTICATE, token, userId }
}

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${PrivKeys.firebaseWebAPIKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        const resData = await response.json()

        dispatch(authenticate(resData.idToken, resData.localId));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${PrivKeys.firebaseWebAPIKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errData = await response.json();
            const errorId = errData.error.message;
            let message = errData.error.message;

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            }

            throw new Error(message)
        }

        const resData = await response.json()

        dispatch(authenticate(resData.idToken, resData.localId));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const logOut = () => {
    return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}