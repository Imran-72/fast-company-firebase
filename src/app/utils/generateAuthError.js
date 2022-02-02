function generateAuthError(message) {
    switch (message) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        case "INVALID_PASSWORD":
            return "Email или пароль введены некорректно";
        default:
            return "Слишком много попыток входа. Попробуйте позднее";
    }
}

export default generateAuthError;
