export interface ICookie {
    jwt?: string;
}

export interface UserPayload {
    email: string;
    login: string;
    id: string;
}
