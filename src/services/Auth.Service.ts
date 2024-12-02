import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccountRepository } from 'repositories/accounts/Accounts.Repository';
import { ILoginCredentials, IRefreshCredentials } from 'types/controllers/Controllers.Interfaces';
import { IUserPayload } from 'types/global/Global.Interfaces';
import {
    HTTP_STATUS,
    LONGER_ACCESS_TOKEN_TIME,
    LONGER_REFRESH_TOKEN_TIME,
    SHORT_ACCESS_TOKEN_TIME,
    SHORT_REFRESH_TOKEN_TIME,
} from 'constants/general/general.Constants';
import { IAuthService } from 'types/services/Services.Interfaces';
import { ApiError } from 'middlewares/apiErrors/ApiError';

export class AuthService implements IAuthService {
    async login({ identifier, password, rememberMe, sessionID }: ILoginCredentials) {
        const foundUser = await AccountRepository().getAccountWithRolesByIdentifier(identifier);

        if (!foundUser) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND.code, 'User not found!');
        }

        const match = bcrypt.compareSync(password, foundUser.password);

        if (!match) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED.code, 'Password or identifier incorrect!');
        }

        // Access Token

        const dataPassedToAccessToken = {
            roles: foundUser.roles.map((role) => role.name),
            accountId: foundUser.id,
        };

        const accessToken = jwt.sign(dataPassedToAccessToken, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: rememberMe ? LONGER_ACCESS_TOKEN_TIME : SHORT_ACCESS_TOKEN_TIME,
        });

        // Refresh Token

        const dataPassedToRefreshToken = {
            email: foundUser.email,
        };

        const refreshToken = jwt.sign(dataPassedToRefreshToken, String(process.env.REFRESH_TOKEN_SECRET), {
            expiresIn: rememberMe ? LONGER_REFRESH_TOKEN_TIME : SHORT_REFRESH_TOKEN_TIME,
        });

        return {
            accessToken,
            refreshToken,
            userData: dataPassedToAccessToken,
            sessionData: {
                sessionID,
                rememberMe,
            },
        };
    }

    async refreshSession({ refreshToken, sessionID, loginSavedSessionID, rememberMe }: IRefreshCredentials) {
        const decoded = await new Promise<IUserPayload>((resolve, reject) => {
            jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET), (err, decodedToken) => {
                if (err) {
                    reject(err);
                }

                resolve(decodedToken as IUserPayload);
            });
        });

        const foundUser = await AccountRepository().getAccountWithRolesByIdentifier(decoded.email);

        if (!foundUser) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED.code, 'User not found!');
        }

        if (!rememberMe && sessionID !== loginSavedSessionID) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED.code, 'Multi session detected');
        }

        const dataPassedToAccessToken = {
            roles: foundUser.roles.map((role) => role.name),
            accountId: foundUser.id,
        };

        const accessToken = jwt.sign(dataPassedToAccessToken, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: rememberMe ? LONGER_ACCESS_TOKEN_TIME : SHORT_ACCESS_TOKEN_TIME,
        });

        return { accessToken };
    }
}

export const authService = new AuthService();
