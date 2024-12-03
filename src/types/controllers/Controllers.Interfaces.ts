export interface ILoginCredentials {
    identifier: string;
    password: string;
    rememberMe: boolean;
}

export interface IRefreshCredentials {
    refreshToken: string;
    rememberMe: boolean;
}
