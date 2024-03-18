export interface IUserAccount {
    id: string;
    login: string;
    email: string;
    password: string;
    isActive: boolean;
    deactivationDate: Date;
}
