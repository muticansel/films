const INVALID_PASSWORD = "INVALID_PASSWORD";
const INVALID_EMAIL = "INVALID_EMAIL";
const EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";
const EMAIL_EXISTS = "EMAIL_EXISTS";
const MISSING_EMAIL = "MISSING_EMAIL";
const MISSING_PASSWORD = "MISSING_PASSWORD";

export const firebaseAuthErrorHandlig = (errData) => {
    switch (errData.error.message) {
        case INVALID_PASSWORD:
            return "Your password is wrong. Please try again!";
        case INVALID_EMAIL:
            return "Your have to enter a valid e-mail!"
        case EMAIL_NOT_FOUND:
            return "This email could not be found. Please sign up to be able to login";
        case EMAIL_EXISTS:
            return "This email exists in our system. Please try another one.";
        case EMAIL_EXISTS:
            return "This email exists in our system. Please try another one.";
        case MISSING_EMAIL:
            return "I guess, you forgot to enter the e-mail. Are you here?";
        case MISSING_PASSWORD:
            return "I guess, you forgot to enter the password. Do you know it is necessary?";
        default:
            return errData.error.message;
    }
}