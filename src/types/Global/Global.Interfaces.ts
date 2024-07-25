import { Request } from 'express';

export interface ICookie {
    jwt?: string;
}

export interface IUserPayload {
    email: string;
    login: string;
    id: string;
}

export interface ICustomError extends Error {
    statusCode?: number;
}

export interface ICustomRequest extends Request {
    user?: string;
}

export interface ICustomVisbilityFieldRequest extends Request {
    selectFields?: string[];
}
