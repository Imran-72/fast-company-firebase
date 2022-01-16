const TOKEN_KEY = "jwt_token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt_expires";
const USERID_KEY = "user-local-id";

export function setTokens({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) {
    const expiresData = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, refreshToken);
    localStorage.setItem(REFRESH_TOKEN, idToken);
    localStorage.setItem(EXPIRES_KEY, expiresData);
}

export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
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
    getTokenExpiresData,
    getUserId,
    removeAuthData
};

export default localStorageService;
