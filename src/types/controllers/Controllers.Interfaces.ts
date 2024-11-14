export interface ILoginCredentials {
    identifier: string;
    password: string;
    rememberMe: boolean;
    sessionID: string;
}

export interface IRefreshCredentials {
    refreshToken: string;
    sessionID: string;
    loginSavedSessionID: string;
    rememberMe: boolean;
}
