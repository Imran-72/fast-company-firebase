const TOKEN_KEY = "jwt_token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt_expires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresData = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(TOKEN_KEY, refreshToken);
    localStorage.setItem(REFRESH_TOKEN, idToken);
    localStorage.setItem(EXPIRES_KEY, expiresData);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

export function getTokenExpiresData() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresData
};

export default localStorageService;
