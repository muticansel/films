const INVALID_PASSWORD = "INVALID_PASSWORD";
const EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";
const EMAIL_EXISTS = "EMAIL_EXISTS";


export const firebaseAuthErrorHandlig = (errData) => {
    switch (errData.error.message) {
        case INVALID_PASSWORD:
            return "Your password is wrong. Please try again!"
        case EMAIL_NOT_FOUND:
            return "This email could not be found. Please sign up to be able to login";
            case EMAIL_EXISTS:
                    return "This email exists in our system. Please try another one.";
        default:
            return errData.error.message;
    }
}