export interface ILoginCredentials {
    identifier: string;
    password: string;
    rememberMe: boolean;
    sessionID: string;
}

export interface IRefreshCredentials {
    sessionID: string;
}
